import React from 'react'
import Viewer from '../../Layout/Viewer'
import Toaster from '../../utils/Toaster'
import { FormControl, FormGroup, FormLabel, Form, Col, Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as Style from './style'
import ProjectService from '../../services/projectService'
import HoursProvisioningService from '../../services/hoursProvisioningService'
import CategoryService from '../../services/categoryService'
import EmployeeService from '../../services/employeeService'

export default class HoursProvisioningReal extends React.Component {

    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            invalid: {
                show: false,
                message: ""
            },
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
                employee: {},
                creationDate: "2020-01-20",
                amountHours: 0
            },
            newDados: {
                project: {},
                employee: {},
                creationDate: "2020-01-20",
                amountHours: 0
            },
            selectDados: {
                projects: [],
                categories: [],
                resources: [],
                months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
            },
            provisionings: []
        }
    }

    componentDidUpdate() {
        console.log("Prov state: ", this.state)
    }

    async mount(){
        await ProjectService.getAllByEmployeeId(this.props.logged.id)
            .then(async (res) => {
                if (res.data.length > 0) {
                    await HoursProvisioningService.getAllFiltered({
                        projectId: res.data[0].id
                    })
                        .then(async (res2) => {
                            await EmployeeService.getAllByProject({ projectId: res.data[0].id })
                                .then(res3 => {
                                    this.setState({
                                        ...this.state,
                                        selectDados: {
                                            ...this.state.selectDados,
                                            resources: res3.data = "" ? [] : res3.data
                                        },
                                        newDados: {
                                            ...this.state.newDados,
                                            employee: res3.data[0].employee ? res3.data[0].employee : {}
                                        },
                                        editDados: {
                                            ...this.state.editDados,
                                            employee: res3.data[0].employee ? res3.data[0].employee : {}
                                        }
                                    })
                                })
                            let aux = []
                            if (res2.data == "") {
                                console.log("res2 data is null")
                                aux = []
                            } else {
                                res2.data.map((value, i) => {
                                    let m = new Date(value.creationDate).getMonth();
                                    if (aux.find(u => u.id == m)) {
                                        let obj = aux.find(u => u.id == m)
                                        obj.provisionings.push(value)
                                    } else {
                                        aux.push({
                                            id: m,
                                            name: this.state.selectDados.months[m],
                                            provisionings: [value]
                                        })
                                    }
                                })
                                console.log("Aux l: ",aux)
                                aux.sort((a, b) => { return a.id - b.id })
                                console.log("Aux l 2:", aux)
                            }
                            this.setState({
                                ...this.state,
                                provisionings: aux,
                                newDados: {
                                    ...this.state.newDados,
                                    project: res.data[0]
                                }
                            })
                            console.log("RES2: ", res2)
                        })
                        .catch(error => {
                            console.log("EE 2", error)
                        })
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
                            console.log("Cat e", error)
                        })
                }else{
                    this.setState({
                        ...this.state,
                        invalid: {
                            show: true,
                            message: "Você não está gerindo nenhum projeto"
                        }
                    })
                }
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
                console.log("Prov error: " + error);
            })
    }

    async componentDidMount() {
        this.props.setLoad(true)
        await this.mount();
        this.props.setLoad(false)
        this.props.setShowMenu(true)
    }

    async createProvisioning() {
        this.props.setLoad(true)
        await HoursProvisioningService.create([this.state.newDados])
            .then(async (res) => {
                await this.mount()
                this.setState({
                    ...this.state,
                    toaster: {
                        header: "Sucesso",
                        body: "Dados gravados com sucesso"
                    },
                    showToaster: true,
                    showFiltros: true,
                    showEdit: false
                })
            })
            .catch(error => {
                console.log("error create prov: " + error)
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    async updateProvisioning() {
        this.props.setLoad(true)
        await HoursProvisioningService.update(this.state.editDados)
            .then(async (res) => {
                await this.mount();
                this.setState({
                    ...this.state,
                    toaster: {
                        header: "Sucesso",
                        body: "Dados gravados com sucesso"
                    },
                    showToaster: true,
                    showFiltros: true,
                    showEdit: false
                })
            })
            .catch(error => {
                console.log("error update prov: " + error)
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    async deleteProvisioning() {
        this.props.setLoad(true)
        await HoursProvisioningService.delete({ "id": this.state.editDados.id })
            .then(async (res) => {
                await this.mount()
                this.setState({
                    ...this.state,
                    toaster: {
                        header: "Sucesso",
                        body: "Dados excluídos com sucesso"
                    },
                    showToaster: true,
                    showFiltros: true,
                    showEdit: false
                })
            })
            .catch(error => {
                console.log("error delete prov: " + error)
            })
            .finally(() => {
                this.props.setLoad(false)
            })
    }

    editProvisioning(data) {
        let month = new Date(data.creationDate).getMonth() + 1
        this.setState({
            ...this.state,
            showFiltros: false,
            showEdit: true,
            editDados: {
                id: data.id,
                creationDate: "2020-" + (month < 10 ? "0" + month : month) + "-20",
                employee: {
                    ...data.employee,
                    category: data.category
                },
                project: data.project,
                amountHours: data.amountHours
            }
        })
    }

    handleProjectFiltro(e) {
        this.setState({
            ...this.state,
            project: this.state.selectDados.projects[e.target.value]
        })
    }

    handleCategory(e) {
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                category: this.state.selectDados.categories[e.target.value]
            }
        })
    }

    handleHoursEdit(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                amountHours: parseInt(e.target.value)
            }
        })
    }

    handleEditProject(e) {
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.newDados,
                project: e.target.value
            }
        })
    }

    handleEditCreationDate(e) {
        let value = e.target.value;
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                creationDate: "2020-" + (value < 10 ? "0" + value : value) + "-20"
            }
        })
    }

    handleEditHoras(e) {
        let value = e.target.value;
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.newDados,
                amountHours: parseInt(value)
            }
        })
    }

    handleEditResource(e) {
        let value = e.target.value;
        let res = this.state.selectDados.resources.find(v => v.employee.id == value)
        this.setState({
            ...this.state,
            editDados: {
                ...this.state.editDados,
                employee: res.employee
            }
        })
    }

    handleNewProject(e) {
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                project: e.target.value
            }
        })
    }

    handleNewCreationDate(e) {
        let value = e.target.value;
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                creationDate: "2020-" + (value < 10 ? "0" + value : value) + "-20"
            }
        })
    }

    handleNewHoras(e) {
        let value = e.target.value;
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                amountHours: parseInt(value)
            }
        })
    }

    handleNewResource(e) {
        let value = e.target.value;
        let res = this.state.selectDados.resources.find(v => v.employee.id == value).employee
        this.setState({
            ...this.state,
            newDados: {
                ...this.state.newDados,
                employee: res
            }
        })
    }

    render() {
        return (
            <>
                <Viewer setLoad={this.props.setLoad} showMenu={this.props.showMenu} setShowMenu={this.props.setShowMenu}>
                    <Toaster
                        show={this.state.showToaster}
                        setShowToaster={(sit) => { this.setState({ ...this.state, showToaster: sit }); }}
                        header={this.state.toaster.header}
                        body={this.state.toaster.body}
                    />
                    <Style.Container>
                        {
                            this.state.invalid.show ? 
                                <><div style="color:black;">{this.state.invalid.message}</div></> :
                                <>
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
                                                    <Style.BotaoForm onClick={() => { console.log("FFF: ", this.state.provisionings) }}>
                                                        Filtrar
                                                    </Style.BotaoForm>
                                                </Style.DFooter>
                                            </Style.Dados>
                                            <Style.DadosThree>
                                                <Style.DHeader> Provisionamento de Horas: {this.state.project.name} </Style.DHeader>
                                                <Style.DBody>
                                                    <Style.DBoxBodyProv>
                                                        <Style.SubContainer>
                                                            {
                                                                this.state.provisionings.map((month, i) => {
                                                                    return (
                                                                        <Style.Component>
                                                                            <Style.DHeaderTwo>{month.name}</Style.DHeaderTwo>
                                                                            <Style.CBody>
                                                                                {
                                                                                    month.provisionings.map((prov, i) => {
                                                                                        return (
                                                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{prov.employee.name} - {prov.category.dsCategory}</Tooltip>}>
                                                                                                <Style.ProvButton onClick={() => { this.editProvisioning(prov) }}>
                                                                                                    <Style.ProvSpam>{prov.amountHours}</Style.ProvSpam>
                                                                                                </Style.ProvButton>
                                                                                            </OverlayTrigger>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </Style.CBody>
                                                                        </Style.Component>
                                                                    );
                                                                })
                                                            }
                                                        </Style.SubContainer>
                                                    </Style.DBoxBodyProv>
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
                                                                        <Form.Control as="select"
                                                                            defaultValue={this.state.editDados.employee.id}
                                                                            onChange={(event) => { this.handleEditResource(event) }}>
                                                                            {
                                                                                this.state.selectDados.resources.map((v, i) => {
                                                                                    return (
                                                                                        <option value={v.employee.id}>{v.employee.name}</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </Card.Body>
                                                            </Style.DBoxFirst>
                                                            <Style.DBoxFirst>
                                                                <Card.Body className="fundoForm">
                                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                                        <Form.Label>Categoria</Form.Label>
                                                                        <Form.Control type="text" value={this.state.editDados.employee.category.dsCategory} readOnly />
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
                                                                        <Form.Control as="select" 
                                                                            defaultValue={parseInt(this.state.editDados.creationDate.split("-")[1])} 
                                                                            onChange={(event) => { this.handleEditCreationDate(event) }}>
                                                                            {
                                                                                this.state.selectDados.months.map((v, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <option value={(i + 1)}>{v}</option>
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
                                                        <Style.BotaoForm onClick={() => { this.updateProvisioning() }}>
                                                            Gravar
                                                    </Style.BotaoForm>
                                                        <Style.BotaoForm onClick={() => { this.deleteProvisioning() }}>
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
                                                                        <Form.Control as="select"
                                                                            defaultValue={this.state.selectDados.resources[0].employee.name}
                                                                            onChange={(event) => { this.handleNewResource(event) }} >
                                                                            {
                                                                                this.state.selectDados.resources.map((v, i) => {
                                                                                    return (
                                                                                        <option value={v.employee.id}>{v.employee.name}</option>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                </Card.Body>
                                                            </Style.DBoxFirst>
                                                            <Style.DBoxFirst>
                                                                <Card.Body className="fundoForm">
                                                                    <Form.Group as={Col} controlId="formGridCategory">
                                                                        <Form.Label>Categoria</Form.Label>
                                                                        <Form.Control type="text" value={this.state.newDados.employee.category.dsCategory || ""} readOnly />
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
                                                                        <Form.Control as="select" 
                                                                            defaultValue={parseInt(this.state.newDados.creationDate.split("-")[1])}
                                                                            onChange={(event) => { this.handleNewCreationDate(event) }}>
                                                                            {
                                                                                this.state.selectDados.months.map((v, i) => {
                                                                                    return (
                                                                                        <option value={(i + 1)}>{v}</option>
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
                                                    </Style.DFooter>
                                                </Style.DadosTwo>
                                            </>
                                    }
                                </>
                        }
                    </Style.Container>
                </Viewer>
            </>
        );
    }
}