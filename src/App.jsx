import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import "./scss/custom.scss"
import AddingFloor from './components/AddingFloor';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [floorPlans, setFloorPlans] = useState({});
  const [curId, setCurId] = useState(null);

  function addNewFloorPlan() {
    let id = uuidv4();
    switchId(id);
    let newFloorPlans = floorPlans
    newFloorPlans[id] =  {
      floorName: "New Floor",
      floorType: "select",
      originalImage: null,
      modedImage: null,
      imageState: null,
      exteriorType: "select",
      facingDirection: "select",
      exteriorSize: "",
      interiorSize: "",
    };
    setFloorPlans(newFloorPlans);
  }

  const updateFloorPlans = (newFloorPlans) => {
    setFloorPlans(newFloorPlans)
  }

  function switchId(key) {
    setCurId(key);
  }
  

  const heightRef = useRef(null);

  return (<>
    <div className="container-lg pt-5 h-100 m-xs-0 p-xs-0" >
      <h2 className="fw-bold">99 Keys Exam - Adding Floor Plans</h2>
      <div className="flex-grow-0 d-flex m-xs-0 p-xs-0" style={{ height:"600px", minWidth:"900px", overflowX:"auto" }}>
        <div style={{width:"200px"}} 
          className="bg-light p-3 me-3 rounded-3 d-flex flex-shrink-0 flex-column overflow-auto">
          {Object.keys(floorPlans).map((key) =>{
            return <div key={key}>
              {floorPlans[key].modedImage != null && 
                <p 
                  className="mb-0"
                  style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                  {floorPlans[key].floorName}
                </p>}
              <button 
                type="" 
                onClick={(e) => switchId(key)}
                className= {"btn flex-shrink-0 w-100 mb-1 p-0  " 
                  + (key == curId ? "btn-outline-primary" : "btn-outline-dark")}
                style={{height: "100px"}}>
                {floorPlans[key].modedImage != null && <img 
                  src={floorPlans[key].modedImage} 
                  alt="" 
                  height= "90px"
                />}
                {floorPlans[key].modedImage == null && 
                  <p 
                    style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {floorPlans[key].floorName}
                  </p>}
                
            </button>
          </div>
          })}
          <button 
            type="" 
            onClick={addNewFloorPlan}
            className="btn btn-outline-dark w-100 mb-1" 
            style={{height: "80px"}}>
            +
          </button>
        </div>
        <div ref={heightRef}className="bg-light rounded-3 flex-fill">
          <AddingFloor id={curId} floorPlans={floorPlans} updateFloorPlans={updateFloorPlans}/>
        </div>
      </div>
    </div>
   </>
  )
}

export default App
