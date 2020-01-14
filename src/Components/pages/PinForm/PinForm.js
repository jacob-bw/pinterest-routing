import React from 'react';
import authData from '../../../helpers/data/authData';
import './PinForm.scss';
import pinData from '../../../helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinName: '',
    pinImgUrl: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinName: pin.title, pinImgUrl: pin.imageUrl });
        })
        .catch((err) => console.error('error with get single pin', err));
    }
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ pinName: e.target.value });
  }

  imgChange = (e) => {
    e.preventDefault();
    this.setState({ pinImgUrl: e.target.value });
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { boardId, pinId } = this.props.match.params;
    const editedPin = {
      title: this.state.pinName,
      imageUrl: this.state.pinImgUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.editPin(pinId, editedPin)
      .then(() => this.props.history.push(`/board/${boardId}/`))
      .catch((error) => console.error('error from edit pin', error));
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPin = {
      title: this.state.pinName,
      imageUrl: this.state.pinImgUrl,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}/`))
      .catch((error) => console.error('error from save pin', error));
  }


  render() {
    const { pinName, pinImgUrl } = this.state;
    const { pinId } = this.props.match.params;
    return (
      <form className="PinForm">
        <div className="form-group">
          <label htmlFor="pin-name">Pin Name</label>
          <input
          type="text"
          className="form-control"
          id="pin-name"
          placeholder="Enter Pin Name"
          value={pinName}
          onChange={this.nameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-img-url">Pin Img Url</label>
          <input
          type="text"
          className="form-control"
          id="pin-img-url"
          placeholder="Enter Image Url for Pin here"
          value={pinImgUrl}
          onChange={this.imgChange}
          />
        </div>
        { pinId
          ? <button className="btn btn-warning" onClick={this.editPinEvent}>Save Changes</button>
          : <button className="btn btn-warning" onClick={this.savePinEvent}>Save Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
