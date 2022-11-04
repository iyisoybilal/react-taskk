import React, { useEffect, useState } from "react";
import CustomButton from "../components/button";
import Preloader from "../components/Preloader";


const Comments = () => {

    const [data, setData] = useState([]);
    const [modalState, setModalState] = useState([]);
    const [customButtonName, setCustomButtonName] = useState('Deneme');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (data.length > 0)
            getSecondData();
        else {
            getFirstData();
        }
    }, [data])

    const getData = async () => {
        setIsLoading(true);
        let data = await fetch("https://jsonplaceholder.typicode.com/comments");
        let json = await data.json();
        setData(json);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)

    };

    const getSecondData = () => {
        setCustomButtonName('Getirildi.')
    }
    const getFirstData = () => {
        setCustomButtonName('Veri Yok')
    }
    const deleteData = () => {
        setData([]);
    }

    const customOnclick = () => {
        console.log('custom click')
    }
    const handleModal = (index) => {
        setModalState(data[index]);
        document.querySelector('.modal').style.display = 'block';

    }
    return (
        <>
            <Preloader isActive={isLoading}></Preloader>
            <div className="button">
                <CustomButton onClick={customOnclick} text={customButtonName} />
                <button onClick={getData}>Verileri Getir</button>
                <button onClick={deleteData}>Verileri Sil</button>
            </div>

            {
                isLoading === true ? <div>Yüklemek için butona basın...</div> :
                    data.length === 0 ? <div>Yüklemek için butona basın...</div> :
                        <table className="table table-bordered" >
                            <thead className="table-primary">
                                <tr >
                                    <th scope="col" >Post Id</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Body</th>

                                </tr>
                            </thead>

                            <tbody >
                                {
                                    data.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="bg-danger">{item.postId}</td>
                                            <td className="bg-primary" >{item.id}</td>
                                            <td className="bg-success">{item.name}</td>
                                            <td className="bg-warning">{item.email}</td>
                                            <td className="bg-info">{item.body}</td>
                                            <td className="button-click"><button onClick={() => handleModal(index)}>Click</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>

                        </table>
            }
            <div className="modal" style={{
                transition: "display 2s ease-out", animation: "fade-in 1s"
            }} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{"Name :" + modalState?.name}</h5>
                            <button type="button" className="btn-close" onClick={() => { document.querySelector('.modal').style.display = 'none'; }} aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            <p>{"Email :" + modalState?.email}</p>
                            <br />
                            <p>{"Body :" + modalState?.body}</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Comments;