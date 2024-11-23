import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchLogs = createAsyncThunk("logs/fetchLogs", async () => {
    const response = await axios.get("/logs"); // Pastikan endpoint `/logs` tersedia di json-server
    return response.data;
  });

// Async thunk untuk menambahkan log
export const addLog = createAsyncThunk("logs/addLog", async (log) => {
  const response = await axios.post("/logs", log); // Pastikan endpoint `/logs` tersedia di json-server
  return response.data;
})



const logsSlice = createSlice({
  name: "logs",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLog.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logsSlice.reducer;
