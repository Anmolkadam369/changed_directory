import addNewData from '../../../Assets/addNewData.png';

const AddNewData = (props) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '76vh',
            textAlign: 'center'
        }}>
            <img src={addNewData} alt="No Data To Show" className='h-[30px] w-[30px] md:h-[70px] md:w-[70px]' />
            {props.index === 0 && (
                <p className='font-semibold text-sm '>Add Accident Vehicle</p>
            )}
            {props.index === 1 && (
                <p  className='font-semibold text-sm '>Add New Vehicle</p>
            )}
             {props.index === 2 && (
                <p  className='font-semibold text-sm '>Already In Accident</p>
            )}
        </div>

    );
};

export default AddNewData;