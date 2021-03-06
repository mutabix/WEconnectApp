import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ContactUs from '../../components/Home/smart/ContactUs.jsx';
import ContactUsContainer from '../../containers/contactUs';
import ContactUsForm from '../../components/Forms/ContactUsForm.jsx';
import FormErrors from '../../components/Messages/presentational/FormErrors.jsx';

const mockStore = configureMockStore([thunk]);

describe('<ContactUs />', () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore({
      user: {
        firstname: 'Admin',
      },
    });
    wrapper = mount(<ContactUs postContactUs={jest.fn(() => Promise.resolve())} />);
  });

  it('should render the container component', () => {
    wrapper = mount(<Provider store={store}>
        <ContactUsContainer />
      </Provider>);

    expect(wrapper.find(ContactUsContainer)).toHaveLength(1);
    const container = wrapper.find(ContactUsContainer);
    expect(container.find(ContactUsForm)).toHaveLength(1);
  });

  it('should render the <ContactUs /> component', () => {
    expect(wrapper.exists(<h3>Contact Us</h3>)).toBe(true);
  });

  it('should render the <ContactUsForm /> component', () => {
    expect(wrapper.find(ContactUsForm)).toHaveLength(1);
  });

  it('should render the <FormErrors /> component if there are errors', () => {
    wrapper.setState({ errors: { message: ['Firstname is required'] } });
    expect(wrapper.find(FormErrors)).toHaveLength(1);
  });

  describe('Contact Form Submit', () => {
    it('should respond to submit event and change the state of the ContactUs Component', () => {
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
    });

    it('should respond to submit event and change the state of the ContactUs Component', () => {
      wrapper = mount(<ContactUs postContactUs={jest.fn(() => Promise.reject())} />);
      const fakeEvent = { preventDefault: () => ({}) };
      wrapper.setState({
        contactInfo: {
          firstname: '', lastname: '', email: '', message: ''
        },
        submitted: false
      });
      wrapper.find('form').simulate('submit', fakeEvent);
    });
  });
});

