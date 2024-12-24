import loadingGif from '../../../Assets/loadingGIF.gif';

const Loading = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '82vh',
            flexDirection:"column",
            textAlign: 'center'
        }}>
            <img src={loadingGif} alt="Loading..." style={{ height: "60px", width: "60px" }} />
            <p style={{color:"red", fontSize:"13px"}}>All services at fingertips</p>
        </div>
        
    );
};

export default Loading;