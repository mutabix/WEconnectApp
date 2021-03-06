import React from 'react';
import { shallow } from 'enzyme';
import Business from '../../../components/Businesses/presentational/Business.jsx';

describe('<Business />', () => {
  it('should render the component', () => {
    const business = {
      id: '2',
      name: 'Andela',
      location: 'Lagos',
      category: 'Gaming',
      reviews: [{ review: 'Nice Business', rating: 3.5 }]
    };
    const wrapper = shallow(<Business business={business} />);
    expect(wrapper.find('.card-image')).toHaveLength(1);
  });
});
