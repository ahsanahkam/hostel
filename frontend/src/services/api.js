/**
 * API Service Module
 * ==================
 * 
 * This file handles all communication with the backend
 * Think of it as a bridge between React (frontend) and Django (backend)
 * 
 * What is axios?
 * - A library for making HTTP requests (GET, POST, PUT, DELETE)
 * - Similar to fetch() but easier to use
 */

import axios from 'axios';

// Base URL for all API requests
const API_BASE_URL = 'http://localhost:8000/api';

// Configure axios to send cookies (for session authentication)
axios.defaults.withCredentials = true;

/**
 * API Functions
 * =============
 * Each function corresponds to one backend API endpoint
 */

// ---------- AUTHENTICATION APIs ----------

export const register = (userData) => {
    /**
     * Register a new user
     * POST /api/users/register/
     */
    return axios.post(`${API_BASE_URL}/users/register/`, userData);
};

export const login = (credentials) => {
    /**
     * Login user
     * POST /api/users/login/
     */
    return axios.post(`${API_BASE_URL}/users/login/`, credentials);
};

export const logout = () => {
    /**
     * Logout current user
     * POST /api/users/logout/
     */
    return axios.post(`${API_BASE_URL}/users/logout/`);
};

export const getCurrentUser = () => {
    /**
     * Get current logged-in user info
     * GET /api/users/me/
     */
    return axios.get(`${API_BASE_URL}/users/me/`);
};

export const updateProfile = (profileData) => {
    /**
     * Update user profile
     * PUT /api/users/profile/update/
     */
    return axios.put(`${API_BASE_URL}/users/profile/update/`, profileData);
};

export const createUser = (userData) => {
    /**
     * Warden creates new user
     * POST /api/users/create-user/
     */
    return axios.post(`${API_BASE_URL}/users/create-user/`, userData);
};

export const listUsers = () => {
    /**
     * Get all users (Warden only)
     * GET /api/users/list/
     */
    return axios.get(`${API_BASE_URL}/users/list/`);
};

export const updateUser = (userId, userData) => {
    /**
     * Update another user's profile (Warden only)
     * PUT /api/users/update-user/<userId>/
     */
    return axios.put(`${API_BASE_URL}/users/update-user/${userId}/`, userData);
};

export const deleteUser = (userId) => {
    /**
     * Delete a user (Warden only)
     * DELETE /api/users/delete-user/<userId>/
     */
    return axios.delete(`${API_BASE_URL}/users/delete-user/${userId}/`);
};

// ---------- ASSET APIs ----------

export const getAssets = () => {
    /**
     * Get all assets
     * GET /api/assets/assets/
     */
    return axios.get(`${API_BASE_URL}/assets/assets/`);
};

export const createAsset = (assetData) => {
    /**
     * Create new asset
     * POST /api/assets/assets/
     */
    return axios.post(`${API_BASE_URL}/assets/assets/`, assetData);
};

export const updateAsset = (id, assetData) => {
    /**
     * Update existing asset
     * PUT /api/assets/assets/{id}/
     */
    return axios.put(`${API_BASE_URL}/assets/assets/${id}/`, assetData);
};

export const deleteAsset = (id) => {
    /**
     * Delete asset
     * DELETE /api/assets/assets/{id}/
     */
    return axios.delete(`${API_BASE_URL}/assets/assets/${id}/`);
};

export const markAssetDamaged = (id) => {
    /**
     * Mark asset as damaged
     * POST /api/assets/assets/{id}/mark_damaged/
     */
    return axios.post(`${API_BASE_URL}/assets/assets/${id}/mark_damaged/`);
};

// ---------- ROOM APIs ----------

export const getRooms = () => {
    /**
     * Get all rooms
     * GET /api/rooms/
     */
    return axios.get(`${API_BASE_URL}/rooms/`);
};

export const createRoom = (roomData) => {
    /**
     * Create new room
     * POST /api/rooms/
     */
    return axios.post(`${API_BASE_URL}/rooms/`, roomData);
};

export const updateRoom = (id, roomData) => {
    /**
     * Update existing room
     * PUT /api/rooms/{id}/
     */
    return axios.put(`${API_BASE_URL}/rooms/${id}/`, roomData);
};

export const deleteRoom = (id) => {
    /**
     * Delete room
     * DELETE /api/rooms/{id}/
     */
    return axios.delete(`${API_BASE_URL}/rooms/${id}/`);
};

// ---------- DASHBOARD APIs ----------

export const getDashboardSummary = () => {
    /**
     * Get dashboard statistics
     * GET /api/dashboard/summary/
     */
    return axios.get(`${API_BASE_URL}/dashboard/summary/`);
};

// ---------- DAMAGE REPORT APIs ----------

export const getDamageReports = () => {
    /**
     * Get all damage reports
     * GET /api/assets/damage-reports/
     */
    return axios.get(`${API_BASE_URL}/assets/damage-reports/`);
};

export const createDamageReport = (reportData) => {
    /**
     * Create new damage report
     * POST /api/assets/damage-reports/
     */
    return axios.post(`${API_BASE_URL}/assets/damage-reports/`, reportData);
};

export const updateDamageReport = (id, reportData) => {
    /**
     * Update damage report (change status)
     * PUT /api/assets/damage-reports/{id}/
     */
    return axios.put(`${API_BASE_URL}/assets/damage-reports/${id}/`, reportData);
};

export const deleteDamageReport = (id) => {
    /**
     * Delete damage report
     * DELETE /api/assets/damage-reports/{id}/
     */
    return axios.delete(`${API_BASE_URL}/assets/damage-reports/${id}/`);
};

export const resetUserPassword = (userId, newPassword) => {
    /**
     * Reset user password (Warden only)
     * POST /api/users/reset-password/{userId}/
     */
    return axios.post(`${API_BASE_URL}/users/reset-password/${userId}/`, { new_password: newPassword });
};

export const requestPasswordReset = (email) => {
    /**
     * Request password reset code
     * POST /api/users/request-reset/
     */
    return axios.post(`${API_BASE_URL}/users/request-reset/`, { email });
};

export const verifyResetCode = (email, code) => {
    /**
     * Verify reset code
     * POST /api/users/verify-code/
     */
    return axios.post(`${API_BASE_URL}/users/verify-code/`, { email, code });
};

export const resetPasswordWithCode = (email, code, newPassword) => {
    /**
     * Reset password with verified code
     * POST /api/users/reset-password-with-code/
     */
    return axios.post(`${API_BASE_URL}/users/reset-password-with-code/`, { 
        email, 
        code, 
        new_password: newPassword 
    });
};
