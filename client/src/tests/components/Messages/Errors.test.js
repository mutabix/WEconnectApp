import React from 'react';
import { shallow } from 'enzyme';
import Errors from '../../../components/Messages/presentational/Errors';

describe('<Errors />', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Errors index={1} message={'Email Exists'}/>);
    expect(wrapper.exists(<li className="collection-item red-text"></li>)).toBe(true);
  });
});
