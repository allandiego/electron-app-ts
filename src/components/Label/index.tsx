import React from 'react';
import clsx from 'clsx';
import { Typography, colors, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: theme.shape.borderRadius,
    lineHeight: '10px',
    fontSize: '10px',
    height: 20,
    minWidth: 20,
    whiteSpace: 'nowrap',
    padding: theme.spacing(0.5, 1),
  },
  rounded: {
    borderRadius: 10,
    padding: theme.spacing(2),
  },
}));

interface LabelProps {
  className?: string;
  color?: string;
  variant?: 'contained' | 'outlined';
  shape?: 'square' | 'rounded';
  style?: React.CSSProperties;
}

const Label: React.FC<LabelProps> = ({
  className,
  variant = 'contained',
  color = colors.green[600],
  shape = 'rounded',
  style,
  children,
  ...rest
}) => {
  const classes = useStyles();

  const rootClassName = clsx(
    {
      [classes.root]: true,
      [classes.rounded]: shape === 'rounded',
    },
    className,
  );

  const finalStyle: React.CSSProperties = { ...style };

  if (variant === 'contained') {
    finalStyle.backgroundColor = color;
    finalStyle.color = '#FFF';
  } else {
    finalStyle.border = `1px solid ${color}`;
    finalStyle.color = color;
  }

  return (
    <Typography
      {...rest}
      className={rootClassName}
      style={finalStyle}
      variant="overline"
    >
      {children}
    </Typography>
  );
};

export default Label;
