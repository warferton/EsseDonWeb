import { Button, makeStyles } from '@material-ui/core';
import { useRef } from 'react';

const useStyles = makeStyles({
    button: {
        width: "100%",
        margin: '1rem',
        backgroundColor: 'black',
        color: 'white',
        '&:hover' : {
            backgroundColor: '#222222'
        }
    },
});

interface IProps {
 handleUpload: (fileData: any) => any;
 title?: string;
}

export function UploadButton(props : IProps) {
    const { handleUpload, title } = props;
    const classes = useStyles();

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    return(
        <Button 
        className={ classes.button }
        variant='outlined'
        onClick={ handleClick }
        >
            {  title || "Загрузить файл" }
            <input
            accept="image/*"
            type="file"
            name="media"
            hidden
            ref={ inputRef }
            onChange={(e)=>{
                 const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                        handleUpload(e.target.files[0]);
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
            />
        </Button>
    );
}