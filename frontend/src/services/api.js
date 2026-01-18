import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

axios.defaults.withCredentials = true;

export const register = (userData) => {
    return axios.post(`${API_BASE_URL}/users/register/`, userData);
};

export const login = (credentials) => {
    return axios.post(`${API_BASE_URL}/users/login/`, credentials);
};

export const logout = () => {
    return axios.post(`${API_BASE_URL}/users/logout/`);
};

export const getCurrentUser = () => {
    return axios.get(`${API_BASE_URL}/users/me/`);
};

export const updateProfile = (profileData) => {
    return axios.put(`${API_BASE_URL}/users/profile/update/`, profileData);
};

export const createUser = (userData) => {
    return axios.post(`${API_BASE_URL}/users/create-user/`, userData);
};

export const listUsers = () => {
    return axios.get(`${API_BASE_URL}/users/list/`);
};

export const updateUser = (userId, userData) => {
    return axios.put(`${API_BASE_URL}/users/update-user/${userId}/`, userData);
};

export const deleteUser = (userId) => {
    return axios.delete(`${API_BASE_URL}/users/delete-user/${userId}/`);
};

export const getAssets = () => {
    return axios.get(`${API_BASE_URL}/assets/assets/`);
};

export const createAsset = (assetData) => {
    return axios.post(`${API_BASE_URL}/assets/assets/`, assetData);
};

export const updateAsset = (id, assetData) => {
    return axios.put(`${API_BASE_URL}/assets/assets/${id}/`, assetData);
};

export const deleteAsset = (id) => {
    return axios.delete(`${API_BASE_URL}/assets/assets/${id}/`);
};

export const markAssetDamaged = (id) => {
    return axios.post(`${API_BASE_URL}/assets/assets/${id}/mark_damaged/`);
};

export const getRooms = () => {
    return axios.get(`${API_BASE_URL}/rooms/`);
};

export const createRoom = (roomData) => {
    return axios.post(`${API_BASE_URL}/rooms/`, roomData);
};

export const updateRoom = (id, roomData) => {
    return axios.put(`${API_BASE_URL}/rooms/${id}/`, roomData);
};

export const deleteRoom = (id) => {
    return axios.delete(`${API_BASE_URL}/rooms/${id}/`);
};

export const getDashboardSummary = () => {
    return axios.get(`${API_BASE_URL}/dashboard/summary/`);
};

export const getDamageReports = () => {
    return axios.get(`${API_BASE_URL}/assets/damage-reports/`);
};

export const createDamageReport = (reportData) => {
    return axios.post(`${API_BASE_URL}/assets/damage-reports/`, reportData);
};

export const updateDamageReport = (id, reportData) => {
    return axios.put(`${API_BASE_URL}/assets/damage-reports/${id}/`, reportData);
};

export const deleteDamageReport = (id) => {
    return axios.delete(`${API_BASE_URL}/assets/damage-reports/${id}/`);
};

export const resetUserPassword = (userId, newPassword) => {
    return axios.post(`${API_BASE_URL}/users/reset-password/${userId}/`, { new_password: newPassword });
};

export const requestPasswordReset = (email) => {
    return axios.post(`${API_BASE_URL}/users/request-reset/`, { email });
};

export const verifyResetCode = (email, code) => {
    return axios.post(`${API_BASE_URL}/users/verify-code/`, { email, code });
};

export const resetPasswordWithCode = (email, code, newPassword) => {
    return axios.post(`${API_BASE_URL}/users/reset-password-with-code/`, { 
        email, 
        code, 
        new_password: newPassword 
    });
};
