import noDataFound from '../../../Assets/noDataFound.png';

const NoDataFound = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '76vh',
            textAlign: 'center'
        }}>
            <img src={noDataFound} alt="No Data To Show" style={{ height: "150px", width: "150px" }} />
        </div>
        
    );
};

export default NoDataFound;