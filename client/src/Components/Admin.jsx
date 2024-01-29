export default function Admin(){
    return(
        <>
        <div className="adminpage">
            <button>Start Election</button>
            <button>End Election</button>

            <p>To add a new Candidate</p>
            <input type="text" name="addcanditate" className="addcandidate" placeholder="Enter name here"/>
            <button>Add Candidate</button>



        </div>
    </>
    )

}



