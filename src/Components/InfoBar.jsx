import '../App.css';


const InfoBar = (props) => {

    return (
        <div className='infobar'>
        <h5>
                {props.info}
        </h5>
            </div>
    )
}

export default InfoBar;