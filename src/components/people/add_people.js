import axios from "axios";
import React from "react";
import Sidebar from "../../components/Sidebar";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SimpleReactValidator from "simple-react-validator";
class AddPeople extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      Photo:"",
      designation:"",
      theme: "snow",
      mobile_message: "",
      validError: false,
      date: Date.now(),
    };
    // this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new SimpleReactValidator({
      className: "text-danger",
      validators: {
        passwordvalid: {
          message:
            "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
            "ter and 1 alphabet.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
        passwordMismatch: {
          message: "confirm password must match with password field.",
          rule: function (val, params, validator) {
            return document.getElementById("password_input").value === val
              ? true
              : false;
          },
        },
        whitespace: {
          message: "The :attribute not allowed first whitespace   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /[^\s\\]/) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialChar: {
          message: "The :attribute not allowed special   characters.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        specialCharText: {
          message: "The :attribute may only contain letters, dot and spaces.",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) &&
              params.indexOf(val) === -1
            );
          },
        },

        zip: {
          message: "Invalid Pin Code",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) &&
              params.indexOf(val) === -1
            );
          },
        },
        website: {
          message: "The Url should be example.com ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
              ) && params.indexOf(val) === -1
            );
          },
        },
        Fax: {
          message: "Invalid fax number ",
          rule: function (val, params, validator) {
            return (
              validator.helpers.testRegex(
                val,
                /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i
              ) && params.indexOf(val) === -1
            );
          },
        },
      },
    });
  }

  // componentDidMount() {
  //   // axios
  //   //   .get(`https://cie-backend-api.herokuapp.com/blog/blogcategorys`)
  //   //   .then((res) => {
  //   //     const blogcategories = res.data;
  //   //     console.log(blogcategories);
  //   //     this.setState({ blogcategories });
  //   //   });
  // }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  onFileChange(e) {
    this.setState({ Photo: e.target.files[0] });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state);
      const formdata = new FormData();
      formdata.append("name", this.state.name);
      formdata.append("designation", this.state.designation);
      formdata.append("Photo", this.state.Photo);
      axios
        .post(
          "https://cie-backend-api.herokuapp.com/people/save",
          formdata
        )
        .then((response)=> {
          // handle success

          console.log(response.data);
          this.props.history.push("/people");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <div className="admin-wrapper col-12">
          <div className="admin-content">
            <div className="admin-head">People - Add New</div>
            <div className="admin-data">
              <div className="container-fluid p-0">
                <form
                  className="form-contact contact_form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="row m-0">
                    <div className="col-lg-12 p-0"></div>
                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Name</label>
                        <input
                          className="form-control col-lg-10"
                          name="name"
                          onChange={this.onChange}
                          value={this.state.name}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "name",
                          this.state.name,
                          "required|whitespace|min:1|max:150"
                        )}
                        {this.state.mobile_message}
                      </div>
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Designation</label>
                        <input
                          className="form-control col-lg-10"
                          name="designation"
                          onChange={this.onChange}
                          value={this.state.designation}
                          type="text"
                          onfocus="this.placeholder = 'Menu Name'"
                          onblur="this.placeholder = ''"
                          placeholder=""
                        />
                        {this.validator.message(
                          "designation",
                          this.state.designation,
                          "required|whitespace|min:1|max:150"
                        )}
                        {this.state.mobile_message}
                      </div>
                      <div className="form-group tags-field row m-0">
                        <label className="col-lg-2 p-0">Photo</label>
                        <input
                          type="file"
                          onChange={this.onFileChange}
                          name="Photo"
                          className="form-control col-lg-10"
                        />

                        {this.validator.message(
                          "Photo",
                          this.state.Photo,
                          "required"
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12 p-0">
                      <div className="form-group tags-field  row m-0">
                        <label className="col-lg-2 p-0" />
                        <div className="col-lg-6 p-0">
                          <button
                            className="button button-contactForm boxed-btn margin"
                            type="submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPeople;
