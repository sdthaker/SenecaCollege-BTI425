import '../marker.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function Legend() {
  return (
    <>
      <span className='ps-4 pe-5'>
        <div
          className='pin bounce position-static'
          style={{
            display: 'inline-block',
            backgroundColor: 'maroon',
            cursor: 'pointer',
          }}
        />
        &nbsp;Previously Viewed
      </span>
      <span>
        <div
          className='pin bounce position-static'
          style={{
            display: 'inline-block',
            backgroundColor: 'blue',
            cursor: 'pointer',
          }}
        />
        &nbsp;Current Location
      </span>
      <br></br>
    </>

    // <>
    //   <DropdownButton id='dropdown-basic-button' title='Legend'>
    //     <Dropdown.Item href='#/action-1'>
    //       <span className=''>
    //         {/* ps-4 pe-5 */}
    //         <div
    //           className='pin bounce position-static'
    //           style={{
    //             display: 'inline-block',
    //             backgroundColor: 'maroon',
    //             cursor: 'pointer',
    //           }}
    //         />
    //         &nbsp;Previously Viewed
    //       </span>
    //     </Dropdown.Item>
    //     <br></br>
    //     <Dropdown.Item href='#/action-2'>
    //       <span>
    //         <div
    //           className='pin bounce position-static'
    //           style={{
    //             display: 'inline-block',
    //             backgroundColor: 'blue',
    //             cursor: 'pointer',
    //           }}
    //         />
    //         &nbsp;Current Location
    //       </span>
    //     </Dropdown.Item>
    //   </DropdownButton>
    // </>
  );
}
