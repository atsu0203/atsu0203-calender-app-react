import { connect } from "react-redux";
import AddScheduleDialog from "./presentation";

import {
  addScheduleCloseDialog,
  addScheduleSetValue
} from "../../redux/addSchedule/actions";

import { asyncSchedulesAddItem } from "../../redux/schedules/effects";

import { asyncSchedulesDeleteItem } from "../../redux/schedules/effects";

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
    dispatch(currentScheduleCloseDialog());
    console.log("aaa");
  },
  saveSchedule: schedule => {
    dispatch(asyncSchedulesAddItem(schedule));
    dispatch(addScheduleCloseDialog());
  }

});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  saveSchedule: () => {
    const {
      schedule: { form: schedule }
    } = stateProps;
    dispatchProps.saveSchedule(schedule);
  },
  deleteItem: () => {
    const { id } = stateProps.schedule.item;
    dispatchProps.deleteItem(id);
    console.log("aaa");
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AddScheduleDialog);
