import React, { Component } from 'react';
import axios from 'axios';
import './Posts.css';
import Modal from 'react-awesome-modal';
import 'bootstrap/dist/css/bootstrap.css';
import jwt_decode from 'jwt-decode';
import { Link, } from 'react-router-dom'



class Posts extends Component {
    state = {
        posts: [],
        name: "",
        description: "",
        destination: "",
        image: "http://www.zarias.com/wp-content/uploads/2015/12/61-cute-puppies.jpg",
        date: "",
        price: "",
        number_of_followers: "",
        show_fields: 0,
        show_error_message: false,
        error_message: "",
        edit_post_id: "",
        edit_post_name: "",
        edit_post_description: "",
        edit_post_destination: "",
        edit_post_image: 0,
        edit_post_startDate: 0,
        edit_post_date: 0,
        edit_post_endDate: 0,
        edit_post_price: 0,
        edit_post_number_of_followers: 0,
        show_edit_modal: false,
        first_name: '',
        role: '',
        startDate: '',
        endDate: '',

    }


    componentDidMount() {
        this.getPosts();
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            role: decoded.role,
            id: decoded.id,
        })

    }
    closeModal() {
        this.setState({
            show_edit_modal: false
        });
    }
    render() {
        return (
            <div>
                <h3>Hello {this.state.first_name} {this.state.last_name}</h3>

                <Modal
                    visible={this.state.show_edit_modal}
                    width="500"
                    height="600"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div className="modal-edit-post">
                        <i className="fa fa-times" onClick={() => this.closeModal()}></i>
                        <h1>Edit vacation</h1>
                        <h4>Change vacation Data</h4>
                        <div className="edit-fields">
                            <div className="form-group">
                                <label>vacation name:</label>
                                <input className="form-control" id="edit_post_name" onChange={this.handleChange} value={this.state.edit_post_name} placeholder="edit name..." />
                            </div>
                            <div className="form-group">
                                <label>vacation description:</label>
                                <input className="form-control" id="edit_post_description" onChange={this.handleChange} value={this.state.edit_post_description} placeholder="edit description..." />
                            </div>
                            <div className="form-group">
                                <label>vacation price:</label>
                                <input className="form-control" id="edit_post_price" onChange={this.handleChange} value={this.state.edit_post_price} placeholder="edit price..." />
                            </div>
                            <div className="form-group">
                                <label>Image Url:</label>
                                <input className="form-control" id="edit_post_image" onChange={this.handleChange} value={this.state.edit_post_image} placeholder="Image Url..." />
                            </div>
                            <div className="form-group">
                                <label>startDate:</label>
                                <input className="form-control" id="edit_post_startDate" onChange={this.handleChange} value={this.state.edit_post_startDate} placeholder="edit_post_startDate" />
                            </div>
                            <div className="form-group">
                                <label>endDate</label>
                                <input className="form-control" id="edit_post_endDate" onChange={this.handleChange} value={this.state.edit_post_endDate} placeholder="edit_post_endDate" />
                            </div>
                        </div>
                        <div className="btn btn-secondary btn-lg btn-block" onClick={this.saveEditedPost.bind(this)} >Save</div>

                    </div>
                </Modal>

                <div className="add-post-wrapper">
                    {this.state.role === 1 ?
                        <div>
                            <div className="buttons-row">

                                <div className="btn btn-success" onClick={this.showHideAddPostFields.bind(this, 1)}>Add vacation</div>
                                <Link to="/posts/chart" className="btn btn-info">
                                    Go to chart
                            </Link>
                            </div>
                        </div>
                        :
                        <div></div>


                    }
                    {
                        this.state.show_fields ?
                            <div className="fields-row">
                                <i className="fa fa-times-circle" onClick={this.showHideAddPostFields.bind(this, 0)}></i>
                                <h3>Add vacation</h3>
                                <input type="text" className="form-control" id="name" onChange={this.handleChange} value={this.state.name} placeholder=" name..." />
                                <input type="text" className="form-control" id="description" onChange={this.handleChange} value={this.state.description} placeholder="description..." />
                                <input type="text" className="form-control" id="destination" onChange={this.handleChange} value={this.state.destination} placeholder="destination..." />
                                <input className="form-control" id="image" onChange={this.handleChange} value={this.state.image} placeholder="Image Url..." />
                                <input type="text" className="form-control" id="startDate" onChange={this.handleChange} value={this.state.startDate} placeholder="startDate..." />
                                <input type="text" className="form-control" id="endDate" onChange={this.handleChange} value={this.state.endDate} placeholder="endDate..." />
                                <input type="text" className="form-control" id="price" onChange={this.handleChange} value={this.state.price} placeholder="price..." />
                                {/* <input type="text" className="form-control" id="number_of_followers" onChange={this.handleChange} value={this.state.number_of_followers} placeholder="number_of_followers..." /> */}

                                <div className="btn btn-success btn-lg btn-block" onClick={this.savePost.bind(this)} >Save</div>
                            </div>
                            :
                            <div></div>

                    }

                </div>
                {
                    this.state.show_error_message ?
                        <div className="alert alert-danger">{this.state.error_message}</div>
                        :
                        <div></div>
                }



                {this.state.role === 1 ?
                    <div>     <div className="posts-wrapper">
                        {
                            this.state.posts.map((post, index) => {
                                return (
                                    <div key={index} className="col-md-3 post ">
                                        <div className="row">
                                            <div className="col-md-8">

                                                <i className="fa fa-trash" onClick={this.deletePost.bind(this, post.id)}></i>
                                                <i className="fa fa-edit" onClick={this.editPost.bind(this, post.id)}></i>

                                                <h4 className="post-body">{post.name}</h4>
                                                <div className="post-body">{post.description}</div>
                                                <div className="post-body">{post.price} $</div>
                                            </div>
                                            <div>
                                                <img alt="vacation" src={post.image} />
                                                <div className="date">start date: {post.startDate} end date: {post.endDate}<div className='follow_num '>{post.number_of_followers}</div></div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div> </div>
                    :
                    <div> <div className="posts-wrapper">
                        {
                            this.state.posts.map((post, index) => {
                                return (
                                    <div key={index} className="col-md-3 post ">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <i className="fa fa-facebook" onClick={this.Follow.bind(this, post.id)}></i>
                                                <h4 className="post-body">{post.name}</h4>
                                                <div className="post-body">{post.description}</div>
                                                <div className="post-body">{post.price} $</div>
                                            </div>
                                            <div>
                                                <img alt="vacation" src={post.image} />

                                                <div className="date">start date: {post.startDate} end date: {post.endDate}<div className='follow_num '>{post.number_of_followers}</div></div>

                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>  </div>


                }

            </div>
        )
    }



    getfollows() {
        axios.get('/posts/follow', {})
            .then((response) => {
                if (response.data.success) {
                    this.state.posts = response.data.data;
                    this.setState({});
                } else {
                    this.state.error_message = response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    Follow = (id) => {
        console.log('vaction_id : ', id)
        axios.post('/posts/follow', { id: id, user_id: this.state.id }).then(res => {
            console.log(res);
            this.getPosts();
        });
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    showHideAddPostFields(val) {
        this.setState({ show_fields: val });
    }

    savePost() {
        let post = {
            name: this.state.name,
            description: this.state.description,
            destination: this.state.destination,
            image: this.state.image,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            price: this.state.price,
            number_of_followers: this.state.number_of_followers,
        }
        axios.post('/posts', { post: post })
            .then((response) => {
                if (response.data.success) {
                    this.showHideAddPostFields(0);
                    this.getPosts();
                    this.getfollows()
                } else {
                    this.state.error_message = response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    saveEditedPost() {
        let post = {
            id: this.state.edit_post_id,
            name: this.state.edit_post_name,
            description: this.state.edit_post_description,
            destination: this.state.edit_post_destination,
            image: this.state.edit_post_image,
            startDate: this.state.edit_post_startDate,
            endDate: this.state.edit_post_endDate,
            price: this.state.edit_post_price,
            number_of_followers: this.state.edit_post_number_of_followers,
        }
        console.log(post)
        axios.put('/posts', { post: post })
            .then((response) => {
                this.closeModal();
                if (response.data.success) {
                    this.getPosts();
                } else {
                    this.state.error_message = response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    getPosts() {
        axios.get('/posts', {})
            .then((response) => {
                if (response.data.success) {
                    this.state.posts = response.data.data;
                    this.setState({});
                } else {
                    this.state.error_message = response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    deletePost(id) {
        axios.delete('/posts', { data: { id: id } })
            .then((response) => {
                if (response.data.success) {
                    this.getPosts();
                } else {
                    this.state.error_message = response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function (error) {
                console.log(error);
                this.state.error_message = error.response.statusText + ", " + error.response.data;
                this.state.show_error_message = true;
                this.setState({});
                //Perform action based on error
            });
    }

    editPost(id) {
        axios.get('/posts/postById', { params: { id: id } })
            .then((response) => {
                if (response.data.success) {

                    let post_to_edit = response.data.data[0];
                    this.state.edit_post_id = post_to_edit.id;
                    this.state.edit_post_name = post_to_edit.name;
                    this.state.edit_post_description = post_to_edit.description;
                    this.state.edit_post_destination = post_to_edit.destination;
                    this.state.edit_post_image = post_to_edit.image;
                    this.state.edit_post_startDate = post_to_edit.startDate;
                    this.state.edit_post_endDate = post_to_edit.endDate;
                    this.state.edit_post_price = post_to_edit.price;
                    this.state.edit_post_number_of_followers = post_to_edit.number_of_followers;
                    this.state.show_edit_modal = true;
                    this.setState({});
                } else {
                    this.state.error_message = response.data.response_text;
                    this.state.show_error_message = true;
                    this.setState({});
                }
            })
            .catch(function (error) {
                console.log(error);
                this.state.error_message = error.response.statusText + ", " + error.response.data;
                this.state.show_error_message = true;
                this.setState({});
                //Perform action based on error
            });
    }


}

export default Posts;