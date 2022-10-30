import { connect } from "react-redux";
import AddScheduleDialog from "./presentation";

import {
  addScheduleCloseDialog,
  addScheduleSetValue,
  addScheduleStartEdit
} from "../../redux/addSchedule/actions";

import { asyncSchedulesAddItem } from "../../redux/schedules/effects";

import { asyncSchedulesDeleteItem } from "../../redux/schedules/effects";

import { isCloseDialog } from "../../services/schedule";


const mapStateToProps = state => ({ schedule: state.addSchedule });

const mapDispatchToProps = dispatch => ({
  setSchedule: value => {
    dispatch(addScheduleSetValue(value));
  },
  closeDialog: () => {
    dispatch(addScheduleCloseDialog());
  },
  deleteItem: id => {
    dispatch(asyncSchedulesDeleteItem(id));
    dispatch(addScheduleCloseDialog());
  },
  saveSchedule: schedule => {
    dispatch(asyncSchedulesAddItem(schedule));
    dispatch(addScheduleCloseDialog());
  },
  setIsEditStart: () => {
    dispatch(addScheduleStartEdit());
  }

});

const mergeProps = (stateProps, dispatchProps) => {
  const {
    schedule: { form: schedule }
  } = stateProps;
  const { saveSchedule, closeDialog } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    saveSchedule: () => {
      saveSchedule(schedule);
    },
    closeDialog: () => {
      if (isCloseDialog(schedule)) {
        closeDialog();
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AddScheduleDialog);
