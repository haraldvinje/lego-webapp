// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import prepare from 'app/utils/prepare';
import { formValueSelector } from 'redux-form';
import {
  fetchInterestGroup,
  editInterestGroup
} from 'app/actions/InterestGroupActions';
import { uploadFile } from 'app/actions/FileActions';
import { selectGroup } from 'app/reducers/groups';
import InterestGroupEdit from './components/InterestGroupEdit';
import loadingIndicator from 'app/utils/loadingIndicator';

const mapDispatchToProps = {
  editInterestGroup,
  uploadFile,
  handleSubmitCallback: editInterestGroup
};

const mapStateToProps = (state, props) => {
  const id = props.params.interestGroupId;
  const valueSelector = formValueSelector('interestGroupEditor');
  const interestGroup = selectGroup(state, { groupId: id });

  return {
    interestGroup,
    initialValues: interestGroup,
    groupMembers: valueSelector(state, 'members') || []
  };
};

export default compose(
  prepare(({ params: { interestGroupId } }, dispatch) =>
    dispatch(fetchInterestGroup(Number(interestGroupId)))
  ),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  loadingIndicator(['interestGroup'])
)(InterestGroupEdit);
