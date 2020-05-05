import { Form, Button } from 'react-bootstrap'
import * as React from 'react';
import { connect } from 'react-redux';
import { fetchTemplates, createDeployment } from '../redux/list-actions';


interface IDeployment {
    templateName: String,
    version: String,
    url: String,
    deployedAt: Date
}
class DeploymentForm extends React.Component<any> {
    state = { formData: { templateName: '', version: '', url: '' }, selectedTemplateId: '' };

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.createTemplate({ ...this.state.formData, deployedAt: new Date() })
    };


    handleNameChange = (event: any) => {
        const selectedTemplateId = event.target.value;
        this.setState({ selectedTemplateId })
        const selectedEle = this.props.templates.find((ele: any) => ele._id === selectedTemplateId)
        this.setState((prevState: any) => ({
            formData: {
                ...prevState.formData,
                templateName: selectedEle.name
            }
        }))
    }
    handleVersionChange = (event: any) => {
        const version = event.target.value;
        this.setState((prevState: any) => ({
            formData: {
                ...prevState.formData,
                version
            }
        }))
    }
    handleUrlChange = (event: any) => {
        const url = event.target.value;
        this.setState((prevState: any) => ({
            formData: {
                ...prevState.formData,
                url
            }
        }))
    }
    getTemplateNames = (data: any) => {
        return data.map((ele: any) => <option key={ele._id} value={ele._id}>{ele.name}</option>)
    }
    getVersions = (data: any) => {
        return this.state.selectedTemplateId ? data.map((ele: any) => {
            if (ele._id === this.state.selectedTemplateId) {

                return ele.versions.map((ver: any, i: number) => {
                    return (<option key={i} value={ver}>{ver}</option>)
                })
            }
        }) : ''
    }
    render() {
        const data = this.props.templates;
        const nameOptions = this.getTemplateNames(data)
        const versionOptions = this.getVersions(data)
        return (
            <Form className="inner-items">
                <Form.Group >
                    <Form.Label>Select Template Name</Form.Label>
                    <Form.Control as="select" onChange={this.handleNameChange} required>
                        <option value="">--select name--</option>
                        {nameOptions}
                    </Form.Control>

                    <Form.Label>Select Version</Form.Label>
                    <Form.Control as="select" disabled={!this.state.selectedTemplateId} onChange={this.handleVersionChange} required>
                        <option value="">--select version--</option>
                        {versionOptions}
                    </Form.Control>
                    <Form.Label>Enter URL</Form.Label>
                    <Form.Control type="text" placeholder="Normal text" onChange={this.handleUrlChange} disabled={!this.state.formData.version} />
                    <br></br>
                    <Button variant="primary" className="actionButton" onClick={this.handleSubmit} disabled={!(this.state.formData.templateName && this.state.formData.version && this.state.formData.url)}>Add to Deployment</Button>
                </Form.Group>
            </Form>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        templates: state.templates
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        getTemplatesData: () => { dispatch(fetchTemplates()) },
        createTemplate: (data: IDeployment) => { dispatch(createDeployment(data)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentForm);
