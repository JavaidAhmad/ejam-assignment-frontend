import * as React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Deployments from "../components/list-deployment";
import DeploymentForm from "../components/add-deployment";
import { connect } from 'react-redux';
import { getTemplates, fetchTemplates, fetchDeployments } from '../redux/list-actions';


class Dashboard extends React.Component<any> {
    state = { showDeployment: false, showTemplate: false }
    onAddNewDeploymentHandler = () => {
        this.props.getTemplatesData();
        this.setState({ showTemplate: true })
    }

    onGetDeploymentsHandler = () => {
        this.props.getDeployments();
        this.setState({ showDeployment: true })
    }
    render() {

        return (
            <Container className="container">

                <Row className="outer-row">
                    {!this.props.templates.length ? <Button variant="primary" className="actionButton" onClick={this.onAddNewDeploymentHandler}>Add New Deployment</Button> : ""}
                    {this.props.templates.length ? <DeploymentForm templates={this.props.templates} /> : this.state.showTemplate ? <p>No template data found</p> : ''}

                </Row>
                <Row className="outer-row">
                    {!this.props.deployments.length ? <Button variant="primary" className="actionButton" onClick={this.onGetDeploymentsHandler}>Show Deployments</Button> : ""}
                    {this.props.deployments.length ? <Deployments deployments={this.props.deployments} /> : this.state.showDeployment ? <p>NO DEPLOYMENT PRESENT</p> : ''}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        templates: state.templates,
        deployments: state.deployments
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        getTemplatesData: () => { dispatch(fetchTemplates()) },
        getDeployments: () => { dispatch(fetchDeployments()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

