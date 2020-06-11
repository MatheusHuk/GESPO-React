import React, { useEffect } from 'react'
import Viewer from '../../Layout/Viewer'
import Picker from 'react-month-picker'
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
            project: {},
            filters: {
                category: {},
                month: "",
                year: ""
            },
            editDados: {},
            newDados: {},
            selectDados: {
                projects: [],
                categories: []
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
                                provisionings: res2.data == "" ? [] : res2.data
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

    editProvisioning(data){
        this.setState({
            ...this.state,
            showFiltros: false,
            showEdit: true,
            editDados: data
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

    handleMonth(e){
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                month: e.target.value
            }
        })
    }

    handleYear(e){
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                year: e.target.value
            }
        })
    }

    handleMonthEdit(e){
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                month: e.target.value
            }
        })
    }

    handleYearEdit(e){
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                year: e.target.value
            }
        })
    }

    componentDidUpdate(){
        console.log("Fil: ",this.state.filters)
    }

    render() {
        return (
            <>
                <Viewer>
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
                                        <Style.DBoxBody>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Recurso</Form.Label>
                                                                <Form.Control as="select" value="Choose...">
                                                                    <option>Selecione...</option>
                                                                    <option>Projeto 1</option>
                                                                    <option>Projeto 2</option>
                                                                    <option>Projeto 3</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formCategory">
                                                                <Form.Label>Categoria</Form.Label>
                                                                <Form.Control as="select" onChange={(event) => { this.handleCategory(event) }}>
                                                                    {
                                                                        this.state.selectDados.categories.map((value, i) => {
                                                                            return (
                                                                                <option value={i} key={value.id} >{value.dsCategory}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBox>
                                            <Style.DBox>
                                                <Card.Body className="fundoForm">
                                                    <Form>
                                                        <Form.Row>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Mês</Form.Label>
                                                                <Form.Control onChange={(event) => { this.handleMonth(event) }}/>
                                                            </Form.Group>
                                                            <Form.Group as={Col} controlId="formGridGerente">
                                                                <Form.Label>Ano</Form.Label>
                                                                <Form.Control onChange={(event) => { this.handleYear(event) }}/>
                                                            </Form.Group>
                                                        </Form.Row>
                                                    </Form>
                                                </Card.Body>
                                            </Style.DBox>
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
                                            <Style.DBigBox>
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
                                            <Style.DBoxFirstTwo>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" placeholder="Automatico" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstTwo>
                                        </Style.DBoxBody>
                                        <Style.DBoxBodyFlexRight>
                                            <Style.DBoxFirstThree>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridGerente">
                                                        <Form.Label>Mês</Form.Label>
                                                        <Form.Control onChange={(event) => { this.handleMonthEdit(event) }}/>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstThree>
                                            <Style.DBoxFirstThree>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridGerente">
                                                        <Form.Label>Ano</Form.Label>
                                                        <Form.Control onChange={(event) => { this.handleYearEdit(event) }}/>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstThree>
                                            <Style.DBoxFirstThree>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Horas</Form.Label>
                                                        <Form.Control type="text" value={this.state.editDados.amountHours} />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstThree>
                                        </Style.DBoxBodyFlexRight>
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
                                    <Style.DHeader> Dados do Provisionamento </Style.DHeader>
                                    <Style.DBody>
                                        <Style.DBoxBody>
                                            <Style.DBigBox>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridProjectAction">
                                                        <Form.Label>Projeto</Form.Label>
                                                        <Form.Control as="select" value="Choose...">
                                                            <option>Selecione...</option>
                                                            <option>Projeto 1</option>
                                                            <option>Projeto 2</option>
                                                            <option>Projeto 3</option>
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
                                            <Style.DBoxFirstTwo>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Categoria</Form.Label>
                                                        <Form.Control type="text" placeholder="Automatico" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstTwo>
                                        </Style.DBoxBody>
                                        <Style.DBoxBodyFlexRight>
                                            <Style.DBoxFirstThree>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridResourceAction">
                                                        <Form.Label>Data</Form.Label>
                                                        <Form.Control type="date"></Form.Control>
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstThree>
                                            <Style.DBoxFirstFour>
                                                <Card.Body className="fundoForm">
                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                        <Form.Label>Horas</Form.Label>
                                                        <Form.Control type="text" placeholder="00h" />
                                                    </Form.Group>
                                                </Card.Body>
                                            </Style.DBoxFirstFour>
                                        </Style.DBoxBodyFlexRight>
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
                            </>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}