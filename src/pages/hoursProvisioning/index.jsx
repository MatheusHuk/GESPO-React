import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import * as ReactBootstrap from "react-bootstrap";
import * as Style from './style'

export default function HoursProvisioning({ setLoad }) {

    useEffect(() => {
        setLoad(false);
    }, []);
    
    return (
        <>
            <Viewer>
                <Style.Container>
                    <Style.Dados>
                <div className= "tabela">
                    <h4>Metas</h4>
                <ReactBootstrap.Table striped bordered hover className="table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th>%</th>
                            <th>Estimativa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>bla</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>bla</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Larry the Bird</td>
                            <td>markson </td>
                            <td>@twitter</td>
                            <td>bla</td>
                        </tr>
                    </tbody>
                </ReactBootstrap.Table>
                </div>
                </Style.Dados>
                </Style.Container>
            </Viewer>
        </>
    );
}