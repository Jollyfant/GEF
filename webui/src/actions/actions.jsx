/**
 * Created by wqiu on 18/08/16.
 */
import axios from 'axios';
import Alert from 'react-s-alert';
import { push } from 'react-router-redux';
import actionTypes from './actionTypes';
import apiNames from '../GefAPI';
import { toPairs } from '../utils/utils';

const log = console.log; // bows('actions');

export function servicesFetchStart() {
    return {
        type: actionTypes.SERVICES_FETCH_START
    }
}

export function servicesFetchSuccess(services) {
    return {
        type: actionTypes.SERVICES_FETCH_SUCCESS,
        services: services
    }
}

export function servicesFetchError(errorMessage) {
    return {
        type: actionTypes.SERVICES_FETCH_ERROR,
        errorMessage: errorMessage
    }
}

export function serviceFetchStart() {
    return {
        type: actionTypes.SERVICE_FETCH_START
    }
}

export function serviceFetchSuccess(service) {
    return {
        type: actionTypes.SERVICE_FETCH_SUCCESS,
        service: service
    }
}

export function serviceFetchError(errorMessage) {
    return {
        type: actionTypes.SERVICE_FETCH_ERROR,
        errorMessage: errorMessage
    }
}

export function serviceUpdateStart() {
    return {
        type: actionTypes.SERVICE_UPDATE_START
    }
}

export function serviceUpdateSuccess() {
    return {
        type: actionTypes.SERVICE_UPDATE_SUCCESS,
    }
}

export function serviceUpdateError(errorMessage) {
    return {
        type: actionTypes.SERVICE_UPDATE_ERROR,
        errorMessage: errorMessage
    }
}

export function jobListFetchStart() {
    return {
        type: actionTypes.JOB_LIST_FETCH_START
    }
}

export function jobListFetchSuccess(jobs) {
    return {
        type: actionTypes.JOB_LIST_FETCH_SUCCESS,
        jobs: jobs
    }
}

export function jobListFetchError(errorMessage) {
    return {
        type: actionTypes.JOB_LIST_FETCH_ERROR,
        errorMessage: errorMessage
    }
}

export function jobRemovalStart() {
    return {
        type: actionTypes.JOB_REMOVAL_START
    }
}

export function jobRemovalSuccess(data) {
    return {
        type: actionTypes.JOB_REMOVAL_SUCCESS,
        data: data
    }
}

export function jobRemovalError(errorMessage) {
    return {
        type: actionTypes.JOB_REMOVAL_ERROR,
        errorMessage: errorMessage
    }
}

export function volumesFetchStart() {
    return {
        type: actionTypes.VOLUME_FETCH_START
    }
}

export function volumesFetchSuccess(volumes) {
    return {
        type: actionTypes.VOLUME_FETCH_SUCCESS,
        volumes: volumes
    }
}

export function volumesFetchError(errorMessage) {
    return {
        type: actionTypes.VOLUME_FETCH_ERROR,
        errorMessage: errorMessage
    }
}

export function fileUploadStart() {
    return {
        type: actionTypes.FILE_UPLOAD_START
    }
}

export function newBuild(buildID) {
    return {
        type: actionTypes.NEW_BUILD,
        buildID: buildID
    }
}

export function newBuildError(errorMessage) {
    return {
        type: actionTypes.NEW_BUILD_ERROR,
        errorMessage: errorMessage
    }
}

export function fileUploadSuccess(data) {
    return {
        type: actionTypes.FILE_UPLOAD_SUCCESS,
        data: data
    }
}

export function fileUploadError(errorMessage) {
    return {
        type: actionTypes.FILE_UPLOAD_ERROR,
        errorMessage: errorMessage
    }
}

export function inspectVolumeStart() {
    return {
        type: actionTypes.INSPECT_VOLUME_START
    }
}

export function inspectVolumeSuccess(data) {
    return {
        type: actionTypes.INSPECT_VOLUME_SUCCESS,
        data: data
    }
}

export function inspectVolumeEmpty() {
    return {
        type: actionTypes.INSPECT_VOLUME_EMPTY,
        data: []
    }
}

export function inspectVolumeError(errorMessage) {
    return {
        type: actionTypes.INSPECT_VOLUME_ERROR,
        errorMessage: errorMessage
    }
}

export function consoleOutputFetchStart() {
    return {
        type: actionTypes.CONSOLE_OUTPUT_FETCH_START
    }
}

export function consoleOutputFetchSuccess(data) {
    return {
        type: actionTypes.CONSOLE_OUTPUT_FETCH_SUCCESS,
        data: data
    }
}

export function consoleOutputFetchEmpty() {
    return {
        type: actionTypes.CONSOLE_OUTPUT_FETCH_EMPTY,
        data: []
    }
}

export function consoleOutputFetchError(errorMessage) {
    return {
        type: actionTypes.CONSOLE_OUTPUT_FETCH_ERROR,
        errorMessage: errorMessage
    }
}

export function ioAddStart() {
    return {
        type: actionTypes.IO_ADD_START
    }
}

export function ioAddSuccess(data) {
    return {
        type: actionTypes.IO_ADD_SUCCESS,
        data: data
    }
}

export function ioAddError(errorMessage) {
    return {
        type: actionTypes.IO_ADD_ERROR,
        errorMessage: errorMessage
    }
}

export function ioRemoveStart() {
    return {
        type: actionTypes.IO_REMOVE_START
    }
}

export function ioRemoveSuccess(data) {
    return {
        type: actionTypes.IO_REMOVE_SUCCESS,
        data: data
    }
}


//TODO: catch seems to swallow all of the exceptions, not only the exceptions occurred in fetch
//async actions
//these do some extra async stuff before the real actions are dispatched
export function fetchJobs() {
    return function (dispatch, getState)  {
        dispatch(jobListFetchStart());
        const resultPromise = axios.get( apiNames.jobs);
        resultPromise.then(response => {
            log('fetched jobs:', response.data.Jobs);
            dispatch(jobListFetchSuccess(response.data.Jobs));
        }).catch(err => {
            Alert.error("Cannot fetch job information from the server.");
            log("An fetch error occurred", err);
            dispatch(jobListFetchError(err));
        })
    }
}

export function removeJob(jobID) {
    return function (dispatch, getState)  {
        dispatch(jobRemovalStart());
        const resultPromise = axios.delete( apiNames.jobs + "/" + jobID);
        resultPromise.then(response => {
            log('removed job:', response.data);
            dispatch(jobRemovalSuccess(response.data));
            dispatch(fetchJobs());
        }).catch(err => {
            Alert.error("Cannot remove the job.");
            log("An error occurred during the job removal", err);
            dispatch(jobRemovalError(err));
        })
    }
}


export function fetchServices() {
    return function (dispatch, getState)  {
        dispatch(servicesFetchStart());
        const resultPromise = axios.get( apiNames.services);
        resultPromise.then(response => {
            // Alert.info('Services loaded from server');
            log('fetched services:', response.data.Services);
            dispatch(servicesFetchSuccess(response.data.Services));
        }).catch(err => {
            Alert.error("Cannot fetch service information from the server.");
            log("A fetch error occurred");
            dispatch(servicesFetchError(err));
        })
    }
}

export function fetchService(serviceID) {
    return function (dispatch, getState) {
        dispatch(serviceFetchStart());
        const resultPromise = axios.get( apiNames.services + '/' + serviceID);
        resultPromise.then(response => {
            log('fetched service:', response.data);
            dispatch(serviceFetchSuccess(response.data));
        }).catch(err => {
            Alert.error("Cannot fetch service information from the server.");
            log("A fetch error occurred");
            dispatch(serviceFetchError(err));
        })
    }
}

export function fetchVolumes() {
    return function (dispatch, getState) {
        dispatch(volumesFetchStart());
        const resultPromise = axios.get(apiNames.volumes);
        resultPromise.then(response => {
            log('fetched volumes:', response.data.Volumes);
            dispatch(volumesFetchSuccess(response.data.Volumes))
        }).catch(err => {
            Alert.error("Cannot fetch volume information from the server.");
            log("A fetch error occurred");
            dispatch(volumesFetchError(err));
        })
    }
}

export function inspectVolume(volumeId) {
    return function (dispatch, getState) {
        dispatch(inspectVolumeStart());

        if (!volumeId) {
            dispatch(inspectVolumeEmpty());
        } else {
            const resultPromise = axios.get( apiNames.volumes + '/' + volumeId + "/");
            resultPromise.then(response => {
                dispatch(inspectVolumeSuccess(response.data))
            }).catch(err => {
                Alert.error("Cannot fetch volume content information from the server.");
                log("A fetch error occurred");
                dispatch(inspectVolumeError(err));
            })
        }
    }
}

export function consoleOutputFetch(jobId) {
    return function (dispatch, getState) {
        dispatch(consoleOutputFetchStart());

        if (!jobId) {
            dispatch(consoleOutputFetchEmpty());
        } else {
            const resultPromise = axios.get( apiNames.jobs + '/' + jobId + "/output");
            resultPromise.then(response => {
                dispatch(consoleOutputFetchSuccess(response.data))
            }).catch(err => {
                Alert.error("Cannot fetch the console content.");
                log("A fetch error occurred");
                dispatch(consoleOutputFetchError(err));
            })
        }
    }
}

export function handleUpdateService() {
    return function (dispatch, getState) {
        const selectedService = getState().selectedService;
        const allServices = getState().services;
        const serviceEdit = getState().form.ServiceEdit;

        let outputObject =  {
            'Created': selectedService.Service.Created,
            'Description': serviceEdit.values.serviceDescription, // modified
            'ID': selectedService.Service.ID,
            'ImageID': selectedService.Service.ImageID,
            'Input':  selectedService.Service.Input,
            'Name': serviceEdit.values.serviceName, // modified
            'Output': selectedService.Service.Output,
            'RepoTag': selectedService.Service.RepoTag,
            'Size': selectedService.Service.Size,
            'Version': serviceEdit.values.serviceVersion // modified
        };

        dispatch(serviceUpdateStart());
        const resultPromise = axios.put(apiNames.services + '/' + selectedService.Service.ID, outputObject);

        resultPromise.then(response => {
            log('updated service:', response.data);
            Alert.info("Service metadata has been successfully updated");
            // Updating the list of services on the client side without requesting data from the server
            let updatedServices = [];
            let responseService = response.data.Service;
            allServices.map((curService) => {
                if (curService.ID == responseService.ID) {
                    updatedServices.push(responseService);
                } else {
                    updatedServices.push(curService);
                }
            });

            dispatch(serviceUpdateSuccess());
            dispatch(serviceFetchSuccess(response.data));
            dispatch(servicesFetchSuccess(updatedServices)); // forcing to update the list of services
        }).catch(err => {
            Alert.error("Cannot update the service.");
            log("An update error occurred");
            dispatch(serviceUpdateError(err));
        })
    }
}

export function handleSubmitJob() {
    return function (dispatch, getState) {
        const selectedService = getState().selectedService;
        const jobCreater = getState().form.JobCreator;
        log("selectedService", selectedService);
        var fd = new FormData();
        fd.append("serviceID", selectedService.Service.ID);
        toPairs(jobCreater.values).forEach(([k, v]) => fd.append(k, v));
        const resultPromise = axios.post( apiNames.jobs, fd);
        resultPromise.then(response => {
            Alert.info("Your job has been successfully submitted");
            dispatch(push('/jobs' + '/' + response.data.jobID));
            log("created job:", response.data)
        }).catch(err => {
            Alert.error("An error occurred during submitting your job");
            log("An error occurred during creating a job", err);
        });
        console.log("submitting current job:", fd)
    }
}


export function addIOPort(isInput) {
    return function (dispatch, getState)  {
        const selectedService = getState().selectedService;
        const serviceEdit = getState().form.ServiceEdit;
        dispatch(ioAddStart());

        let inputs = [];
        let newInput = {};
        let outputs = [];
        let newOutput = {};
        let selectedInput = [];
        let selectedOutput = [];
        if (selectedService.Service.Input) {
            selectedInput = selectedService.Service.Input
        }
        if (selectedService.Service.Output) {
            selectedOutput = selectedService.Service.Output;
        }
        if (isInput) {
            newInput.ID = "input" + selectedInput.length;
            newInput.Name = serviceEdit.values.inputSourceName;
            newInput.Path = serviceEdit.values.inputSourcePath;
            if ((!newInput.Name) && (!newInput.Path)){
                Alert.error("Input name and path cannot be empty");
                dispatch(ioAddError());
            } else {
                selectedInput.map((input) => {
                    inputs.push(input);
                });
                inputs.push(newInput);
            }

            outputs = selectedOutput;
        } else {
            newOutput.ID = "output" + selectedOutput.length;
            newOutput.Name = serviceEdit.values.outputSourceName;
            newOutput.Path = serviceEdit.values.outputSourcePath;
            if ((!newOutput.Name) && (!newOutput.Path)){
                Alert.error("Output name and path cannot be empty");
                dispatch(ioAddError());
            } else {
                selectedOutput.map((out) => {
                    outputs.push(out);
                });
                outputs.push(newOutput);
            }

            inputs = selectedInput;
        }

        let outputObject = {
            'Created': selectedService.Service.Created,
            'Description': selectedService.Service.Description,
            'ID': selectedService.Service.ID,
            'ImageID': selectedService.Service.ImageID,
            'Input': inputs,
            'Name': selectedService.Service.Name,
            'Output': outputs,
            'RepoTag': selectedService.Service.RepoTag,
            'Size': selectedService.Service.Size,
            'Version': selectedService.Service.Version
        };

        if ((inputs.length>0) || (outputs.length>0)) {
            dispatch(ioAddSuccess(outputObject));
            dispatch(serviceUpdateStart());
            const resultPromise = axios.put(apiNames.services + '/' + selectedService.Service.ID, outputObject);

            resultPromise.then(response => {
                log('updated service:', response.data);
                dispatch(serviceUpdateSuccess());
                dispatch(serviceFetchSuccess(response.data));
            }).catch(err => {
                Alert.error("Cannot update the service.");
                log("An update error occurred");
                dispatch(serviceUpdateError(err));
            })
        }
    }
}

export function removeIOPort(isInput, removeIndex) {
    return function (dispatch, getState)  {
        const selectedService = getState().selectedService;
        dispatch(ioRemoveStart());
        let inputs = [];
        let outputs = [];

        if (isInput) {
            selectedService.Service.Input.map((input, currentIndex) => {
                if (currentIndex != removeIndex) {
                    inputs.push(input);
                }
            });
            outputs = selectedService.Service.Output;
        } else {

            selectedService.Service.Output.map((out, currentIndex) => {
                if (currentIndex != removeIndex) {
                    outputs.push(out);
                }
            });
            inputs = selectedService.Service.Input;
        }

        let outputObject = {
            'Created': selectedService.Service.Created,
            'Description': selectedService.Service.Description,
            'ID': selectedService.Service.ID,
            'ImageID': selectedService.Service.ImageID,
            'Input': inputs,
            'Name': selectedService.Service.Name,
            'Output': outputs,
            'RepoTag': selectedService.Service.RepoTag,
            'Size': selectedService.Service.Size,
            'Version': selectedService.Service.Version
        };

        dispatch(ioRemoveSuccess(outputObject));
        dispatch(serviceUpdateStart());
        const resultPromise = axios.put(apiNames.services + '/' + selectedService.Service.ID, outputObject);

        resultPromise.then(response => {
            log('updated service:', response.data);
            dispatch(serviceUpdateSuccess());
            dispatch(serviceFetchSuccess(response.data));
        }).catch(err => {
            Alert.error("Cannot update the service.");
            log("An update error occurred");
            dispatch(serviceUpdateError(err));
        })
    }
}

export function fetchUser() {
    return function (dispatch, getState)  {
        dispatch(userFetchStart());
        axios.get(apiNames.user)
            .then(response => dispatch(userFetchSuccess(response.data.User)))
            .catch(err => {
                Alert.error("Error fetching user information from the server.");
                log("Error fetching user info:", err);
                dispatch(userFetchError(err));
            });
    }
}

export function userFetchStart() {
    return {
        type: actionTypes.USER_FETCH_START
    }
}

export function userFetchSuccess(user) {
    return {
        type: actionTypes.USER_FETCH_SUCCESS,
        user: user
    }
}

export function userFetchError(errorMessage) {
    return {
        type: actionTypes.USER_FETCH_ERROR,
        errorMessage: errorMessage
    }
}
