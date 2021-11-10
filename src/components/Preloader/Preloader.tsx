import preloader from "../../assets/img/preloader.svg";


const Preloader: React.FC = () => {
    return (
        <div style={ {backgroundColor: 'white'} }>
            <img src={preloader} alt="loading"/>
        </div>
    )
}

export default Preloader;