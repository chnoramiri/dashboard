import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withSnackbar } from 'notistack';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'middle',
    },
    button: {
        margin: 8,
        color: '#fff',
        backgroundColor: '#313131',
    },
    success: {
        backgroundColor: '#43a047',
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#2979ff',
    },
    warning: {
        backgroundColor: '#ffa000',
    },
};

const buttons = [
    { variant: 'success', message: 'Successfully done the operation.' },
    { variant: 'error', message: 'Something went wrong.' },
    { variant: 'warning', message: 'Be careful of what you just did!' },
    { variant: 'info', message: 'For your info...' },
];


class MessageButtons extends Component {
    handleClick = (x, y) => () => {
        // Avoid material-ui warnings. more info: https://material-ui.com/style/typography/#migration-to-typography-v2
        // eslint-disable-next-line no-underscore-dangle
        // window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        this.props.enqueueSnackbar(x, { variant: y });
    };



    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                {buttons.map(button => (
                    <Button
                        key={button.variant}
                        variant="contained"
                        className={clsx(classes.button, classes[button.variant])}
                        onClick={this.handleClick(button.message, button.variant)}
                    >
                        {button.variant}
                    </Button>
                ))}

            </Paper>
        );
    }
}

export default withStyles(styles)(withSnackbar(MessageButtons));
