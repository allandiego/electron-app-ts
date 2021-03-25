import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from '../../components/Layouts/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Box mt={3} />
        TESTE
      </Container>
    </Page>
  );
};

export default Dashboard;
