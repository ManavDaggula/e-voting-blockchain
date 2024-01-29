export default function Voter(){
    return(
        <>
        <div className="voterpage">
            <p>
                Enter your adhaar no.
            </p>
            <input type="text" className="adhaar_no." placeholder="Enter Adhaar Here" />
            <button className="submitadhaar">Submit</button>
            <div className="candidatelist"></div>
        </div>

        </>
    )

}