import { Container, makeStyles } from "@material-ui/core"

interface IProps{
    children: any;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'scroll',
        scrollbarColor: 'transparent',
        height: 'fit-content',
        maxWidth: '100%'
    }
})

export function CardSlider(props : IProps){
    const { children } = props
    const classes = useStyles();
    return(
        <Container classes={ classes }>
            { children }
        </Container>
    )
}