import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Style from './style'
import ProjectService from '../../services/projectService'
import HoursProvisioningService from '../../services/hoursProvisioningService'
import CategoryService from '../../services/categoryService'

export default class HoursProvisioningReal extends React.Component {

    constructor(props){
        super(props)
        this.props = props;
        this.state = {
            showFiltros: true,
            showEdit: false,
            showToaster: false,
            toaster: {
                header: "",
                body: "",
            },
            project: {},
            filters: {
                category: {},
                month: "",
                year: ""
            },
            editDados: {
                project: {},
                resource: {},
                employee: this.props.logged
            },
            newDados: {
                project: {},
                //resource: {},
                employee: this.props.logged,
                creationDate: "2020-01-01",
                amountHours: 0
            },
            selectDados: {
                projects: [],
                categories: [],
                months: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]
            },
            provisionings: []
        }
    }

    componentDidUpdate(){
        console.log("Prov state: ",this.state)
    }

    async componentDidMount(){
        this.props.setLoad(true)
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                let prov = [];
                if(res.data.length > 0){
                    await HoursProvisioningService.getAllFiltered({
                        projectId: res.data[0].id
                    })
                        .then(res2 => {
                            this.setState({
                                ...this.state,
                                provisionings: res2.data == "" ? [] : res2.data,
                                newDados: {
                                    ...this.state.newDados,
                                    project: res.data[0]
                                }
                            })
                            prov = res2.data
                            console.log("RES2: ",res2)
                        })
                        .catch(error => {
                            console.log("EE 2",error)
                        })
                        .finally(() => {
                            this.props.setLoad(false)
                        })
                }
                await CategoryService.getAll()
                    .then(res => {
                        this.setState({
                            ...this.state,
                            selectDados: {
                                ...this.state.selectDados,
                                categories: res.data == "" ? [] : res.data
                            }
                        })
                    })
                    .catch(error => {
                        console.log("Cat e",error)
                    })
                    .finally(() => {
                        this.props.setLoad(false)
                    })
                this.setState({
                    ...this.state,
                    selectDados: {
                        ...this.state.selectDados,
                        projects: res.data == "" ? [] : res.data
                    },
                    project: res.data == "" ? {} : res.data[0]
                })
            })
            .catch(error => {
                console.log("Prov error: "+error);
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    async createProvisioning(){
        this.props.setLoad(true)
        await HoursProvisioningService.create([this.state.newDados])
            .then(async (res) => {
                await HoursProvisioningService.getAllFiltered({
                    projectId: this.state.newDados.project.id
                })
                    .then(res2 => {
                        this.setState({
                            ...this.state,
                            provisionings: res2.data == "" ? [] : res2.data,
                            toaster: {
                                header: "Sucesso",
                                body: "Dados gravados com sucesso"
                            },
                            showToaster: true,
                            showFiltros: true
                        })
                    })
            })
            .catch(error => {
                console.log("error create prov: "+error)
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    editProvisioning(data){
        let month= new Date(data.creationDate).getMonth() + 1
        this.setState({
            ...this.state,
            showFiltros: false,
            showEdit: true,
            editDados: {
                ...data,
                creationDate: "2020-"+(month < 10 ? "0"+month : month)+"-01"
            }
        })
    }

    handleProjectFiltro(e){
        this.setState({
            ...this.state,
            project: this.state.selectDados.projects[e.target.value]
        })
    }

    handleCategory(e){
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                category: this.state.selectDados.categories[e.target.value]
            }
        })
    }

    handleHoursEdit(e){
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                amountHours: parseInt(e.target.value)
            }
        })
    }

    handleNewProject(e){
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                project: e.target.value
            }
        })
    }

    handleNewCreationDate(e){
        let value = e.target.value;
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                creationDate: "2020-"+(value < 10 ? "0"+value : value)+"-01"
            }
        })
    }

    handleNewHoras(e){
        let value = e.target.value;
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                amountHours: value
            }
        })
    }

    render() {
        return (
            <>
                <Viewer>
                    <Toaster
                        show={this.state.showToaster}
                        setShowToaster={(sit) => { this.setState({ ...this.state, showToaster: sit }); }}
                        header={this.state.toaster.header}
                        body={this.state.toaster.body}
                    />
                    <Style.Container>
                        <Style.HeaderContainer>
                            <Style.HeaderButton
                                selected={this.state.showFiltros}
                                onClick={() => { this.setState({ ...this.state, showFiltros: true, showEdit: false }) }}
                            >
                                <p>Provisionamentos</p>
                            </Style.HeaderButton>
                            <Style.HeaderButton
                                selected={!this.state.showFiltros && !this.state.showEdit}
                                onClick={() => { this.setState({ ...this.state, showFiltros: false, showEdit: false }) }}
                            >
                                <p>Novo provisionamento</p>
                            </Style.HeaderButton>
                            <Style.HeaderEditButton
                                selected={this.state.showEdit}
                            >
                                <p>Editar provisionamento</p>
                            </Style.HeaderEditButton>
                        </Style.HeaderContainer>
                        {this.state.showFiltros ? 
                            <>
                                <Style.Dados>
                                    <Style.DHeader> Filtros </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Projeto</Form.Label>
                                                                <Form.Control as="select" onChange={(event) => { this.handleProject(event) }}>
                                                                    {
                                                                        this.state.selectDados.projects.map((value, i) => {
                                                                            return (
                                                                                <option value={i} key={value.id} >{value.name}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBigBox>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { console.log("FFF: ",this.state.provisionings) }}>
                                            Filtrar
                                        </Style.BotaoForm>
                                    </Style.DFooter>
                                </Style.Dados>
                                <Style.DadosThree>
                                    <Style.DHeader> Provisionamento de Horas: {this.state.project.name} </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.SubContainer>
                                                <Style.Component>
                                                    <Style.DHeaderTwo> Jan/2020 </Style.DHeaderTwo>
                                                    <Style.DBody>
                                                        <Style.DBoxBody>
                                                            {
                                                                this.state.provisionings.map((value, i) => {
                                                                    return (
                                                                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">"Categoria: { value.category.dsCategory }"</Tooltip>}>
                                                                            <span className="d-inline-block">
                                                                                <Button onClick={() => { this.editProvisioning(value) }}>
                                                                                    {value.amountHours}
                                                                                </Button>
                                                                            </span>
                                                                        </OverlayTrigger>
                                                                    );
                                                                })
                                                            }
                                                        </Style.DBoxBody>
                                                    </Style.DBody>
                                                </Style.Component>
                                            </Style.SubContainer>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                </Style.DadosThree>
                            </>
                            : this.state.showEdit ? 
                            <>
                                <Style.DadosTwo>
                                    <Style.DHeader> Editar Provisionamento </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridProjectAction">
                                                        <Form.Label>Projeto</Form.Label>
                                                        <Form.Control as="select" value={this.state.editDados.project.name}>
                                                        {
                                                            this.state.selectDados.projects.map((value, i) => {
                                                                return (
                                                                    <option value={i} key={value.id} >{value.name}</option>
                                                                );
                                                            })
                                                        }         
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Recurso</Form.Label>
                                                        <Form.Control as="select">
                                                            <option>Selecione...</option>
                                                            <option>Recurso 1</option>
                                                            <option>Recurso 2</option>
                                                            <option>Recurso 3</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" placeholder="Automatico" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Horas</Form.Label>
                                                        <Form.Control type="text" onChange={(event) => { this.handleHoursEdit(event) }} value={this.state.editDados.amountHours} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Mês</Form.Label>
                                                        <Form.Control as="select" value={parseInt(this.state.editDados.creationDate.split("-")[1])} onChange={(event) => { this.handleNewCreationDate(event) }}>
                                                            {
                                                                this.state.selectDados.months.map((v, i) => {
                                                                    return(
                                                                        <>
                                                                            <option value={(i+1)}>{v}</option>
                                                                        </>
                                                                        
                                                                    )
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm>
                                            Gravar
                                        </Style.BotaoForm>
                                        <Style.BotaoForm>
                                            Deletar
                                        </Style.BotaoForm>
                                    </Style.DFooter>
                                </Style.DadosTwo>
                            </> : 
                            <>
                                <Style.DadosTwo>
                                    <Style.DHeader> Novo Provisionamento </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridProjectAction">
                                                        <Form.Label>Projeto</Form.Label>
                                                        <Form.Control as="select" onChange={(event) => { this.handleNewProject(event) }} >
                                                            {
                                                                this.state.selectDados.projects.map((value, i) => {
                                                                    return (
                                                                        <option value={value} key={value.id} >{value.name}</option>
                                                                    );
                                                                })
                                                            }      
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBigBox>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Recurso</Form.Label>
                                                        <Form.Control as="select" value="Choose...">
                                                            <option>Selecione...</option>
                                                            <option>Recurso 1</option>
                                                            <option>Recurso 2</option>
                                                            <option>Recurso 3</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" placeholder="Automatico" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                        </Style.DBoxBody>
                                        <Style.DBoxBody>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Horas</Form.Label>
                                                        <Form.Control type="number" value={this.state.newDados.amountHours} onChange={(event) => { this.handleNewHoras(event) }} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                            <Style.DBoxFirst>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Mês</Form.Label>
                                                        <Form.Control as="select" onChange={(event) => { this.handleNewCreationDate(event) }}>
                                                            {
                                                                this.state.selectDados.months.map((v, i) => {
                                                                    return(
                                                                        <option value={(i+1)}>{v}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirst>
                                        </Style.DBoxBody>
                                    </Style.DBody>
                                    <Style.DFooter>
                                        <Style.BotaoForm onClick={() => { this.createProvisioning() }}>
                                            Gravar
                                        </Style.BotaoForm>
                                        <Style.BotaoForm>
                                            Deletar
                                        </Style.BotaoForm>
                                    </Style.DFooter>
                                </Style.DadosTwo>
                            </>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}