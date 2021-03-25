import path from 'path';
import fs from 'fs';
import neatCsv from 'neat-csv';

interface CompaniesData {
  CODIGO_EMPRESA: string;
  NOME_EMPRESA: string;
}

interface DepartmentsData {
  CODIGO_OBRIGACAO: string;
  DEPARTAMENTO: string;
}

interface ServiceInput {
  companiesConfigPath: string;
  departamentsConfigPath: string;
  originConfigPath: string;
  destinationConfigPath: string;
}

interface FilesToProcess {
  fileName: string;
  newPath: string;
}

async function getDataFromCsvFile<T>(filePath: string): Promise<T[]> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Caminho indicado (${filePath}) inválido`);
  }

  try {
    const fileData = fs.readFileSync(filePath);
    const parsedData = await neatCsv<T>(fileData, { separator: ',' });
    return parsedData;
  } catch (error) {
    // console.log(error);
    throw new Error(`Erro ao tentar ler o arquivo (${filePath})`);
  }
}

function sanitizePathNames(filePath: string) {
  return filePath.normalize('NFD')
    ? // eslint-disable-next-line no-misleading-character-class
      filePath.normalize('NFD').replace(/[^\w\s\-_\u0300-\u036f]+/g, '-')
    : filePath.replace(/[^\w\s\-_]+/g, '-');
}

function getFileList(directoryPath: string) {
  try {
    const directoryPathResolved = path.resolve(directoryPath);
    const files = fs.readdirSync(directoryPathResolved);
    return files;
  } catch (error) {
    console.log(error);
    throw new Error(`Erro ao ler os arquivos do ditretório ${directoryPath}`);
  }
}

export default class MoveFilesService {
  public async execute({
    companiesConfigPath,
    departamentsConfigPath,
    originConfigPath,
    destinationConfigPath,
  }: ServiceInput): Promise<void> {
    // console.log('ORIGEM', originConfigPath);
    // console.log('DESTINO', destinationConfigPath);

    if (!fs.existsSync(companiesConfigPath)) {
      throw new Error(
        `Arquivo de configuração não existe ${companiesConfigPath}`,
      );
    }
    if (!fs.existsSync(departamentsConfigPath)) {
      throw new Error(
        `Arquivo de configuração não existe ${departamentsConfigPath}`,
      );
    }
    if (!fs.existsSync(originConfigPath)) {
      throw new Error(
        `Caminho de origem dos arquivos inválido ${originConfigPath}`,
      );
    }

    if (!fs.existsSync(destinationConfigPath)) {
      fs.mkdirSync(destinationConfigPath, {
        recursive: true,
      });
    }

    const companiesData = await getDataFromCsvFile<CompaniesData>(
      companiesConfigPath,
    );
    // console.log('companiesData', companiesData);
    const sanitizedCompaniesData = companiesData.map(item => ({
      ...item,
      NOME_EMPRESA: sanitizePathNames(item.NOME_EMPRESA),
    }));

    // DEPARTAMENT DATA
    const departmentsData = await getDataFromCsvFile<DepartmentsData>(
      departamentsConfigPath,
    );
    // console.log('departmentsData', departmentsData);
    const sanitizeddepartmentsData = departmentsData.map(item => ({
      ...item,
      DEPARTAMENTO: sanitizePathNames(item.DEPARTAMENTO),
    }));

    const filesToMove = getFileList(originConfigPath).filter(
      file => path.extname(file) === '.pdf',
    );

    const filesToProcess: FilesToProcess[] = filesToMove.map(file => {
      const fileName = path.parse(file).name;
      const fileNameParts = fileName.split('-');
      // console.log(fileNameParts);

      if (fileNameParts.length !== 3) {
        throw new Error(`Padrão de nome de arquivo inválido - ${file}`);
      }

      // TYPE
      const newPathType =
        // eslint-disable-next-line no-nested-ternary
        Number(fileNameParts[0]) >= 8000
          ? 'Doméstica'
          : Number(fileNameParts[0]) < 8000
          ? 'Empresas'
          : null;

      if (!newPathType) {
        throw new Error(
          `Não foi possível identificar o tipo ${fileNameParts[0]}`,
        );
      }

      // COMPANY
      const findCompanyName = sanitizedCompaniesData.find(
        company => company.CODIGO_EMPRESA === fileNameParts[0],
      );
      if (!findCompanyName || !findCompanyName.NOME_EMPRESA) {
        throw new Error(
          `Não foi possível identificar o nome da empresa ${fileNameParts[0]}`,
        );
      }
      const newPathCompanyName = findCompanyName.NOME_EMPRESA;

      // DEPARTAMENT
      const findDepartament = sanitizeddepartmentsData.find(
        departament => departament.CODIGO_OBRIGACAO === fileNameParts[1],
      );
      if (!findDepartament || !findDepartament.DEPARTAMENTO) {
        throw new Error(
          `Não foi possível identificar o departamento para ${fileNameParts[1]}`,
        );
      }
      const newPathDepartament = findDepartament.DEPARTAMENTO;

      // MONTH YEAR
      if (fileNameParts[2].length !== 4 && fileNameParts[2].length !== 6) {
        throw new Error(
          `Erro ao tentar identificar o mês e ano ou ano ${fileNameParts[2]}`,
        );
      }

      const newPathYear =
        fileNameParts[2].length === 4
          ? fileNameParts[2]
          : fileNameParts[2].substr(-4);

      const newPathMonth =
        fileNameParts[2].length === 4 ? null : fileNameParts[2].substr(0, 2);

      let newPath = `${destinationConfigPath}\\${newPathType}\\${newPathCompanyName}\\${newPathDepartament}\\${newPathYear}`;
      if (newPathMonth) {
        newPath += `\\${newPathMonth}`;
      }

      const fileToProcess: FilesToProcess = {
        fileName: file,
        newPath,
      };

      return fileToProcess;
    });

    // move files
    // eslint-disable-next-line no-restricted-syntax
    for (const [idx, file] of filesToProcess.entries()) {
      const oldFilePath = `${originConfigPath}\\${file.fileName}`;
      const newFilePath = `${file.newPath}\\${file.fileName}`;

      try {
        if (!fs.existsSync(file.newPath)) {
          try {
            fs.mkdirSync(file.newPath, { recursive: true });
          } catch (error) {
            throw new Error(
              `Erro ao tentar criar o caminho ${idx} - ${file.newPath}`,
            );
          }
        }

        fs.renameSync(oldFilePath, newFilePath);
        // console.log(`MOVENDO:\n${oldFilePath}\n${newFilePath}\n`);
      } catch (error) {
        // console.log(error);
        throw new Error(
          `Erro ao tentar mover o arquivo\n${oldFilePath} \npara \n${newFilePath}`,
        );
      }
    }
  }
}
