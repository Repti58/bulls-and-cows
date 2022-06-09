import '../App.css';


const InfoBar = (props) => {



    return (
        <h5>                  
                <div className="infoBar">
                    {props.typeError}
                </div>            
        </h5>
    )
}

export default InfoBar;