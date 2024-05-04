import { useState, useEffect } from "react";
import ImageEditor from "./ImageEditor";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

export default function AddingFloor({id, floorPlans, updateFloorPlans}) {
  const [curImageUrl, setCurImageUrl] = useState(null)
  const [curImageState, setCurImageState] = useState(null)

  function updateImageState(id, imageState, modedImage) {
    let updatedFloorPlans = {...floorPlans}
    updatedFloorPlans[id].imageState = imageState
    updatedFloorPlans[id].modedImage = modedImage
    updateFloorPlans(updatedFloorPlans)
  }
  // Note Might be causing unecessary rerender
  useEffect(()=>{
    if (id != null) {
      let updatedFloorPlans = {...floorPlans}
      updatedFloorPlans[id].originalImage = curImageUrl
      updateFloorPlans(updatedFloorPlans)
    }
  },[curImageUrl])

  useEffect(() => {
    if (floorPlans[id] == null || floorPlans[id].originalImage == "") {
      setCurImageUrl(null)
      setCurImageState(null)
    } else {
      setCurImageUrl(floorPlans[id].originalImage)
      setCurImageState(floorPlans[id].imageState)
    }
  }, [id])

  return (<div className="p-3">
    <h4 className="fw-bold">Adjust Floor Plans</h4>
    <div className={id == null ? "invisible": ""}>
    <form>
      <div className="row">
        <div className="col-8">
          <ImageEditor 
              id={id} 
              curImageUrl={curImageUrl}
              setCurImageUrl={setCurImageUrl}
              curImageState={curImageState}
              updateImageState={updateImageState}
            />
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="floor-name" className="form-label">Floor Name</label>
            <input type="text" 
                value={id != null ? floorPlans[id].floorName : 0}
                onChange={(e) => {
                  let newFloorPlans = {...floorPlans};
                  newFloorPlans[id].floorName = e.target.value
                  updateFloorPlans(newFloorPlans)
                }}
                step="0.01" 
                min="0" 
                className="form-control" 
                id="interior-size">
            </input>
          </div>
          <div className="mb-3">
            <label htmlFor="interior-size" className="form-label">Interior Size</label>
            <input type="text" 
                value={id != null ? floorPlans[id].interiorSize : 0}
                onChange={(e) => {
                  let newFloorPlans = {...floorPlans}
                  newFloorPlans[id].interiorSize = e.target.value
                  updateFloorPlans(newFloorPlans)
                }}
                className="form-control" 
                id="interior-size">
            </input>
          </div>
          <div className="mb-3">
            <label htmlFor="interior-size" className="form-label">Exterior Size</label>
            <input type="text" 
                value={id != null ? floorPlans[id].exteriorSize: 0}
                onChange={(e) => {
                  let newFloorPlans = {...floorPlans}
                  newFloorPlans[id].exteriorSize = e.target.value
                  updateFloorPlans(newFloorPlans)
                }}
                className="form-control" 
                id="interior-size">
            </input>
          </div>
          <div className="mb-3">
            <label htmlFor="exterior-type" className="form-label">Exterior Type</label>
            <select value={id != null ? floorPlans[id].exteriorType : ""}
                onChange={(e) => {
                  let newFloorPlans = {...floorPlans}
                  newFloorPlans[id].exteriorType = e.target.value
                  updateFloorPlans(newFloorPlans)
                }}
                className="form-select form-select" id="exterior-type">
              <option value="select">Select</option>
              <option value="balcony">Balcony</option>
              <option value="none">None</option>
              <option value="option-1">Option 1</option>
              <option value="option-1">Option 2</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="facing-direction" className="form-label">Facing Direction</label>
            <select value={id != null ? floorPlans[id].facingDirection: ""}
                onChange={(e) => {
                  let newFloorPlans = {...floorPlans}
                  newFloorPlans[id].facingDirection = e.target.value
                  updateFloorPlans(newFloorPlans)
                }}
                className="form-select form-select" 
                id="exterior-type">
              <option value="select">Select</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="floor-type" className="form-label">Floor Type</label>
            <select value={id != null ? floorPlans[id].facingDirection: ""}
                onChange={(e) => {
                  let newFloorPlans = {...floorPlans}
                  newFloorPlans[id].facingDirection = e.target.value
                  updateFloorPlans(newFloorPlans)
                }}
                className="form-select form-select" id="floor-type">
              <option value="select">Select</option>
              <option value="north">Studio</option>
              <option value="south">One Bed One Bath</option>
              <option value="east">Two Bed One Bath</option>
              <option value="west">Three Bed 2 Bath</option>
            </select>
          </div>
        </div>
      </div>
    </form>
    </div>
  </div>)
}
