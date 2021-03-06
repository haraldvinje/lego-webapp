// @flow

import { compose } from 'redux';
import { connect } from 'react-redux';
import loadingIndicator from 'app/utils/loadingIndicator';
import EmailListEditor from './components/EmailListEditor';
import { fetchEmailList, editEmailList } from 'app/actions/EmailListActions';
import { selectEmailListById } from 'app/reducers/emailLists';
import { ROLES } from 'app/utils/constants';
import prepare from 'app/utils/prepare';

const mapStateToProps = (state, { routeParams }) => {
  const emailList = selectEmailListById(state, {
    emailListId: routeParams.emailListId
  });
  return {
    emailList,
    emailListId: routeParams.emailListId,
    initialValues: {
      ...emailList,
      // $FlowFixMe
      groups: (emailList.groups || []).filter(Boolean).map(groups => ({
        label: groups.name,
        value: groups.id
      })),
      // $FlowFixMe
      groupRoles: (emailList.groupRoles || []).map(groupRoles => ({
        label: ROLES[groupRoles],
        value: groupRoles
      })),
      // $FlowFixMe
      users: (emailList.users || []).filter(Boolean).map(user => ({
        label: user.fullName,
        value: user.id
      })),
      // $FlowFixMe
      additionalEmails: (emailList.additionalEmails || []).map(
        additionalEmail => ({
          label: additionalEmail,
          value: additionalEmail
        })
      )
    }
  };
};

const mapDispatchToProps = { fetchEmailList, mutateFunction: editEmailList };

const loadData = ({ params }, dispatch) =>
  dispatch(fetchEmailList(params.emailListId));

export default compose(
  prepare(loadData, ['params.emailListId']),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  loadingIndicator(['emailList.name'])
)(EmailListEditor);
