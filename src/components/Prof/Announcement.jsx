import userImg from '../../img/user.jpg';


function Announcement(){
    return(
        <>
            <div class="col">
                <div class="h-100 bg-light rounded p-4">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <h6 class="mb-0">Messages</h6>
                        <a href="">Show All</a>
                    </div>
                    <div class="d-flex align-items-center border-bottom py-3">
                        <img class="rounded-circle flex-shrink-0" src={userImg} alt="" style={{ width: "40px", height: "40px" }}></img>
                        <div class="w-100 ms-3">
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-0">Jhon Doe</h6> 
                                <small>15 minutes</small>
                            </div>
                            <span>Le cours de jeudi sera reporte a mardi prochain</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Announcement;