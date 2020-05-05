import * as React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteDeployment } from '../redux/list-actions';


class Deployments extends React.Component<any>{
    onDeleteHandler = (id: string) => {
        this.props.deleteDeployment(id);
    }
    getDeploymentItems = (data: any) => {
        return data.map((ele: any, i: number) => {
            return <ListGroup.Item as="li" key={ele._id}>
                {ele.templateName}
                <Button variant="danger" key={i} className="actionButton" onClick={() => this.onDeleteHandler(ele._id)}>Delete</Button>
            </ListGroup.Item>
        })
    }
    render() {
        const data = this.props.deployments;
        const items = this.getDeploymentItems(data)
        return (
            <ListGroup as="ul" className="inner-items">
                {items}
            </ListGroup>
        );
    }
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteDeployment: (id: string) => { dispatch(deleteDeployment(id)) }
    }
}

export default connect(null, mapDispatchToProps)(Deployments);