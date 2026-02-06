// ===== TaskTracker Pro - Main Application =====

// ===== Data Store =====
let employees = JSON.parse(localStorage.getItem('employees')) || [];
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let activities = JSON.parse(localStorage.getItem('activities')) || [];

// ===== Sample Data (Initialize if empty) =====
function initializeSampleData() {
    if (employees.length === 0) {
        employees = [
            { id: 1, name: 'Rahul Sharma', email: 'rahul@company.com', department: 'Engineering', role: 'Senior Developer' },
            { id: 2, name: 'Priya Patel', email: 'priya@company.com', department: 'Design', role: 'UI/UX Designer' },
            { id: 3, name: 'Amit Kumar', email: 'amit@company.com', department: 'Marketing', role: 'Marketing Manager' },
            { id: 4, name: 'Sneha Reddy', email: 'sneha@company.com', department: 'Engineering', role: 'Frontend Developer' },
            { id: 5, name: 'Vikram Singh', email: 'vikram@company.com', department: 'Sales', role: 'Sales Executive' },
            { id: 6, name: 'Anjali Gupta', email: 'anjali@company.com', department: 'HR', role: 'HR Manager' },
            { id: 7, name: 'Karthik Nair', email: 'karthik@company.com', department: 'Engineering', role: 'Backend Developer' },
            { id: 8, name: 'Meera Joshi', email: 'meera@company.com', department: 'Finance', role: 'Accountant' }
        ];
        saveEmployees();
    }

    if (tasks.length === 0) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextMonth = new Date(today);
        nextMonth.setDate(nextMonth.getDate() + 30);

        tasks = [
            { id: 1, title: 'Complete API Integration', description: 'Integrate payment gateway API with the main application', employeeId: 1, priority: 'high', status: 'in-progress', dueDate: formatDate(tomorrow), createdAt: formatDate(twoDaysAgo) },
            { id: 2, title: 'Design Landing Page', description: 'Create modern landing page design for new product launch', employeeId: 2, priority: 'high', status: 'pending', dueDate: formatDate(yesterday), createdAt: formatDate(twoDaysAgo) },
            { id: 3, title: 'Marketing Campaign', description: 'Plan and execute Q1 marketing campaign', employeeId: 3, priority: 'medium', status: 'pending', dueDate: formatDate(twoDaysAgo), createdAt: formatDate(twoDaysAgo) },
            { id: 4, title: 'Fix Navigation Bug', description: 'Resolve mobile navigation menu issues', employeeId: 4, priority: 'high', status: 'completed', dueDate: formatDate(today), createdAt: formatDate(yesterday) },
            { id: 5, title: 'Client Presentation', description: 'Prepare presentation for new client meeting', employeeId: 5, priority: 'high', status: 'pending', dueDate: formatDate(yesterday), createdAt: formatDate(twoDaysAgo) },
            { id: 6, title: 'Employee Onboarding', description: 'Complete onboarding documentation for new hires', employeeId: 6, priority: 'medium', status: 'in-progress', dueDate: formatDate(nextWeek), createdAt: formatDate(today) },
            { id: 7, title: 'Database Optimization', description: 'Optimize database queries for better performance', employeeId: 7, priority: 'medium', status: 'pending', dueDate: formatDate(tomorrow), createdAt: formatDate(today) },
            { id: 8, title: 'Monthly Report', description: 'Prepare monthly financial report', employeeId: 8, priority: 'high', status: 'completed', dueDate: formatDate(today), createdAt: formatDate(yesterday) },
            { id: 9, title: 'Code Review', description: 'Review pull requests from team members', employeeId: 1, priority: 'medium', status: 'completed', dueDate: formatDate(today), createdAt: formatDate(yesterday) },
            { id: 10, title: 'User Research', description: 'Conduct user research for new feature', employeeId: 2, priority: 'low', status: 'pending', dueDate: formatDate(nextMonth), createdAt: formatDate(today) },
            { id: 11, title: 'Social Media Update', description: 'Update company social media profiles', employeeId: 3, priority: 'low', status: 'completed', dueDate: formatDate(yesterday), createdAt: formatDate(twoDaysAgo) },
            { id: 12, title: 'Unit Tests', description: 'Write unit tests for new components', employeeId: 4, priority: 'medium', status: 'pending', dueDate: formatDate(nextWeek), createdAt: formatDate(today) }
        ];
        saveTasks();
    }

    if (activities.length === 0) {
        activities = [
            { id: 1, type: 'completed', message: 'Sneha Reddy completed "Fix Navigation Bug"', time: new Date().toISOString() },
            { id: 2, type: 'completed', message: 'Meera Joshi completed "Monthly Report"', time: new Date(Date.now() - 3600000).toISOString() },
            { id: 3, type: 'new', message: 'New task "User Research" assigned to Priya Patel', time: new Date(Date.now() - 7200000).toISOString() },
            { id: 4, type: 'pending', message: 'Task "Marketing Campaign" is overdue', time: new Date(Date.now() - 14400000).toISOString() }
        ];
        saveActivities();
    }
}

// ===== Utility Functions =====
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function parseDate(dateString) {
    return new Date(dateString + 'T00:00:00');
}

function isOverdue(dueDate, status) {
    if (status === 'completed') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = parseDate(dueDate);
    return due < today;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    return Math.floor(seconds / 86400) + ' days ago';
}

// ===== Storage Functions =====
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveActivities() {
    localStorage.setItem('activities', JSON.stringify(activities));
}

function addActivity(type, message) {
    activities.unshift({
        id: generateId(),
        type,
        message,
        time: new Date().toISOString()
    });
    if (activities.length > 50) activities.pop();
    saveActivities();
}

// ===== DOM Elements =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const searchInput = document.getElementById('searchInput');

// Modals
const taskModal = document.getElementById('taskModal');
const employeeModal = document.getElementById('employeeModal');
const confirmModal = document.getElementById('confirmModal');

// Forms
const taskForm = document.getElementById('taskForm');
const employeeForm = document.getElementById('employeeForm');

// ===== Navigation =====
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const viewId = item.dataset.view;
        switchView(viewId);
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    });
});

function switchView(viewId) {
    navItems.forEach(nav => nav.classList.remove('active'));
    views.forEach(view => view.classList.remove('active'));
    
    document.querySelector(`[data-view="${viewId}"]`).classList.add('active');
    document.getElementById(`${viewId}View`).classList.add('active');
    
    refreshView(viewId);
}

function refreshView(viewId) {
    switch(viewId) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'employees':
            renderEmployees();
            break;
        case 'tasks':
            renderTasks();
            break;
        case 'incomplete':
            renderIncomplete();
            break;
        case 'reports':
            renderReports();
            break;
    }
}

// ===== Dashboard Render =====
function renderDashboard() {
    // Stats
    const totalEmployees = employees.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
    const overdueTasks = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;

    document.getElementById('totalEmployees').textContent = totalEmployees;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('overdueTasks').textContent = overdueTasks;

    // Incomplete Employees List
    renderIncompleteEmployeesList();
    
    // Activity List
    renderActivityList();
    
    // Progress Chart
    renderProgressChart();
}

function renderIncompleteEmployeesList() {
    const container = document.getElementById('incompleteEmployeesList');
    
    const employeesWithPending = employees.map(emp => {
        const pendingTasks = tasks.filter(t => 
            t.employeeId === emp.id && 
            t.status !== 'completed'
        );
        return { ...emp, pendingCount: pendingTasks.length };
    }).filter(emp => emp.pendingCount > 0)
      .sort((a, b) => b.pendingCount - a.pendingCount);

    if (employeesWithPending.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎉</div>
                <h3>All Tasks Completed!</h3>
                <p>All employees have completed their assigned tasks.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = employeesWithPending.map(emp => `
        <div class="incomplete-employee-item">
            <div class="employee-info">
                <div class="employee-avatar">${getInitials(emp.name)}</div>
                <div class="employee-details">
                    <h4>${emp.name}</h4>
                    <p>${emp.department} • ${emp.role}</p>
                </div>
            </div>
            <span class="pending-count">${emp.pendingCount} pending</span>
        </div>
    `).join('');
}

function renderActivityList() {
    const container = document.getElementById('activityList');
    
    if (activities.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <h3>No Recent Activity</h3>
                <p>Activity will appear here as tasks are updated.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = activities.slice(0, 10).map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                ${activity.type === 'completed' ? '✅' : activity.type === 'new' ? '🆕' : '⏳'}
            </div>
            <div class="activity-content">
                <h4>${activity.message}</h4>
                <p>${timeAgo(activity.time)}</p>
            </div>
        </div>
    `).join('');
}

function renderProgressChart() {
    const container = document.getElementById('progressChart');
    
    const total = tasks.length || 1;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const overdue = tasks.filter(t => isOverdue(t.dueDate, t.status)).length;

    container.innerHTML = `
        <div class="progress-item">
            <div class="progress-label">
                <span>Completed</span>
                <span>${Math.round(completed / total * 100)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill green" style="width: ${completed / total * 100}%"></div>
            </div>
        </div>
        <div class="progress-item">
            <div class="progress-label">
                <span>In Progress</span>
                <span>${Math.round(inProgress / total * 100)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill blue" style="width: ${inProgress / total * 100}%"></div>
            </div>
        </div>
        <div class="progress-item">
            <div class="progress-label">
                <span>Pending</span>
                <span>${Math.round(pending / total * 100)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill orange" style="width: ${pending / total * 100}%"></div>
            </div>
        </div>
        <div class="progress-item">
            <div class="progress-label">
                <span>Overdue</span>
                <span>${Math.round(overdue / total * 100)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill red" style="width: ${overdue / total * 100}%"></div>
            </div>
        </div>
    `;
}

// ===== Employees Render =====
function renderEmployees() {
    const tbody = document.getElementById('employeesTableBody');
    
    if (employees.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-state-icon">👥</div>
                        <h3>No Employees Yet</h3>
                        <p>Add your first employee to get started.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = employees.map(emp => {
        const empTasks = tasks.filter(t => t.employeeId === emp.id);
        const completed = empTasks.filter(t => t.status === 'completed').length;
        const pending = empTasks.filter(t => t.status !== 'completed').length;
        const total = empTasks.length || 1;
        const rate = Math.round(completed / total * 100);
        const rateClass = rate >= 70 ? 'high' : rate >= 40 ? 'medium' : 'low';

        return `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="avatar">${getInitials(emp.name)}</div>
                        <div>
                            <strong>${emp.name}</strong>
                            <br><small style="color: var(--text-secondary)">${emp.email}</small>
                        </div>
                    </div>
                </td>
                <td>${emp.department}</td>
                <td>${empTasks.length}</td>
                <td><span style="color: var(--success)">${completed}</span></td>
                <td><span style="color: var(--warning)">${pending}</span></td>
                <td>
                    <div class="completion-rate">
                        <div class="rate-bar">
                            <div class="rate-fill ${rateClass}" style="width: ${rate}%"></div>
                        </div>
                        <span>${rate}%</span>
                    </div>
                </td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit" onclick="editEmployee(${emp.id})">✏️</button>
                        <button class="action-btn delete" onclick="deleteEmployee(${emp.id})">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// ===== Tasks Render =====
function renderTasks() {
    const grid = document.getElementById('tasksGrid');
    const statusFilter = document.getElementById('filterStatus').value;
    const employeeFilter = document.getElementById('filterEmployee').value;
    const priorityFilter = document.getElementById('filterPriority').value;

    // Populate employee filter
    const employeeSelect = document.getElementById('filterEmployee');
    if (employeeSelect.options.length <= 1) {
        employees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = emp.name;
            employeeSelect.appendChild(option);
        });
    }

    let filteredTasks = [...tasks];

    // Apply filters
    if (statusFilter !== 'all') {
        if (statusFilter === 'overdue') {
            filteredTasks = filteredTasks.filter(t => isOverdue(t.dueDate, t.status));
        } else {
            filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
        }
    }

    if (employeeFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.employeeId === parseInt(employeeFilter));
    }

    if (priorityFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.priority === priorityFilter);
    }

    if (filteredTasks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">📋</div>
                <h3>No Tasks Found</h3>
                <p>Try adjusting your filters or create a new task.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredTasks.map(task => {
        const employee = employees.find(e => e.id === task.employeeId);
        const overdue = isOverdue(task.dueDate, task.status);
        const statusClass = overdue ? 'overdue' : task.status;

        return `
            <div class="task-card priority-${task.priority}">
                <div class="task-header">
                    <div>
                        <h3 class="task-title">${task.title}</h3>
                        <p class="task-description">${task.description}</p>
                    </div>
                </div>
                <div class="task-meta">
                    <span class="task-badge badge-status ${statusClass}">
                        ${overdue ? '⚠️ Overdue' : task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                    </span>
                    <span class="task-badge badge-priority ${task.priority}">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                </div>
                <div class="task-footer">
                    <div class="task-assignee">
                        <div class="avatar">${employee ? getInitials(employee.name) : '?'}</div>
                        <span>${employee ? employee.name : 'Unassigned'}</span>
                    </div>
                    <div class="task-actions">
                        ${task.status !== 'completed' ? 
                            `<button class="action-btn edit" onclick="markComplete(${task.id})" title="Mark Complete">✅</button>` : ''
                        }
                        <button class="action-btn edit" onclick="editTask(${task.id})" title="Edit">✏️</button>
                        <button class="action-btn delete" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="task-due ${overdue ? 'overdue' : ''}">
                    📅 Due: ${task.dueDate}
                </div>
            </div>
        `;
    }).join('');
}

// ===== Incomplete View Render =====
function renderIncomplete() {
    const grid = document.getElementById('incompleteGrid');
    
    const employeesWithIncomplete = employees.map(emp => {
        const incompleteTasks = tasks.filter(t => 
            t.employeeId === emp.id && 
            t.status !== 'completed'
        );
        return { ...emp, incompleteTasks };
    }).filter(emp => emp.incompleteTasks.length > 0)
      .sort((a, b) => b.incompleteTasks.length - a.incompleteTasks.length);

    if (employeesWithIncomplete.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">🎉</div>
                <h3>All Clear!</h3>
                <p>All employees have completed their assigned tasks. Great work team!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = employeesWithIncomplete.map(emp => `
        <div class="incomplete-card">
            <div class="incomplete-header">
                <div class="avatar">${getInitials(emp.name)}</div>
                <div class="incomplete-info">
                    <h3>${emp.name}</h3>
                    <p>${emp.department} • ${emp.incompleteTasks.length} tasks pending</p>
                </div>
            </div>
            <div class="incomplete-tasks">
                ${emp.incompleteTasks.map(task => {
                    const overdue = isOverdue(task.dueDate, task.status);
                    return `
                        <div class="incomplete-task-item">
                            <div>
                                <div class="incomplete-task-title">${task.title}</div>
                                <small style="color: var(--text-secondary)">${task.priority} priority</small>
                            </div>
                            <div class="incomplete-task-due ${overdue ? 'overdue' : ''}">
                                ${overdue ? '⚠️ ' : ''}${task.dueDate}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
}

// ===== Reports Render =====
function renderReports() {
    renderEmployeeCompletionChart();
    renderPriorityDistribution();
    renderTopPerformers();
    renderBottomPerformers();
}

function renderEmployeeCompletionChart() {
    const container = document.getElementById('employeeCompletionChart');
    
    const employeeStats = employees.map(emp => {
        const empTasks = tasks.filter(t => t.employeeId === emp.id);
        const completed = empTasks.filter(t => t.status === 'completed').length;
        const total = empTasks.length || 1;
        const rate = Math.round(completed / total * 100);
        return { name: emp.name, rate, completed, total: empTasks.length };
    }).sort((a, b) => b.rate - a.rate);

    container.innerHTML = employeeStats.map(stat => {
        const color = stat.rate >= 70 ? 'var(--success)' : stat.rate >= 40 ? 'var(--warning)' : 'var(--danger)';
        return `
            <div class="chart-bar-item">
                <span class="chart-bar-label">${stat.name.split(' ')[0]}</span>
                <div class="chart-bar">
                    <div class="chart-bar-fill" style="width: ${stat.rate}%; background: ${color}">
                        ${stat.rate}%
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderPriorityDistribution() {
    const container = document.getElementById('priorityDistribution');
    
    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;
    const total = tasks.length || 1;

    container.innerHTML = `
        <div class="priority-item">
            <span class="priority-label high">🔴 High</span>
            <div class="priority-bar high" style="width: ${high / total * 100}%">${high} tasks</div>
        </div>
        <div class="priority-item">
            <span class="priority-label medium">🟡 Medium</span>
            <div class="priority-bar medium" style="width: ${medium / total * 100}%">${medium} tasks</div>
        </div>
        <div class="priority-item">
            <span class="priority-label low">🟢 Low</span>
            <div class="priority-bar low" style="width: ${low / total * 100}%">${low} tasks</div>
        </div>
    `;
}

function renderTopPerformers() {
    const container = document.getElementById('topPerformers');
    
    const performers = employees.map(emp => {
        const empTasks = tasks.filter(t => t.employeeId === emp.id);
        const completed = empTasks.filter(t => t.status === 'completed').length;
        const total = empTasks.length || 1;
        const rate = Math.round(completed / total * 100);
        return { ...emp, rate, completed };
    }).filter(e => e.completed > 0)
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 3);

    const ranks = ['gold', 'silver', 'bronze'];

    container.innerHTML = performers.length > 0 ? performers.map((p, i) => `
        <div class="performer-item">
            <div class="performer-rank ${ranks[i]}">${i + 1}</div>
            <div class="performer-avatar">${getInitials(p.name)}</div>
            <div class="performer-info">
                <h4>${p.name}</h4>
                <p>${p.department}</p>
            </div>
            <div class="performer-rate">${p.rate}%</div>
        </div>
    `).join('') : '<div class="empty-state"><p>No data available</p></div>';
}

function renderBottomPerformers() {
    const container = document.getElementById('bottomPerformers');
    
    const performers = employees.map(emp => {
        const empTasks = tasks.filter(t => t.employeeId === emp.id);
        const completed = empTasks.filter(t => t.status === 'completed').length;
        const total = empTasks.length || 1;
        const rate = empTasks.length > 0 ? Math.round(completed / total * 100) : 100;
        const pending = empTasks.filter(t => t.status !== 'completed').length;
        return { ...emp, rate, pending };
    }).filter(e => e.pending > 0)
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 3);

    container.innerHTML = performers.length > 0 ? performers.map((p, i) => `
        <div class="performer-item">
            <div class="performer-rank" style="background: var(--danger); color: white">${i + 1}</div>
            <div class="performer-avatar">${getInitials(p.name)}</div>
            <div class="performer-info">
                <h4>${p.name}</h4>
                <p>${p.pending} tasks pending</p>
            </div>
            <div class="performer-rate low">${p.rate}%</div>
        </div>
    `).join('') : '<div class="empty-state"><p>No pending tasks!</p></div>';
}

// ===== Modal Functions =====
document.getElementById('addTaskBtn').addEventListener('click', () => openTaskModal());
document.getElementById('addEmployeeBtn').addEventListener('click', () => openEmployeeModal());

document.getElementById('closeTaskModal').addEventListener('click', closeTaskModal);
document.getElementById('cancelTask').addEventListener('click', closeTaskModal);
document.getElementById('closeEmployeeModal').addEventListener('click', closeEmployeeModal);
document.getElementById('cancelEmployee').addEventListener('click', closeEmployeeModal);
document.getElementById('closeConfirmModal').addEventListener('click', closeConfirmModal);
document.getElementById('cancelConfirm').addEventListener('click', closeConfirmModal);

function openTaskModal(taskData = null) {
    const modal = document.getElementById('taskModal');
    const title = document.getElementById('taskModalTitle');
    const form = document.getElementById('taskForm');
    const employeeSelect = document.getElementById('taskEmployee');
    
    // Populate employee dropdown
    employeeSelect.innerHTML = '<option value="">Select Employee</option>';
    employees.forEach(emp => {
        const option = document.createElement('option');
        option.value = emp.id;
        option.textContent = emp.name;
        employeeSelect.appendChild(option);
    });

    if (taskData) {
        title.textContent = 'Edit Task';
        document.getElementById('taskId').value = taskData.id;
        document.getElementById('taskTitle').value = taskData.title;
        document.getElementById('taskDescription').value = taskData.description;
        document.getElementById('taskEmployee').value = taskData.employeeId;
        document.getElementById('taskPriority').value = taskData.priority;
        document.getElementById('taskDueDate').value = taskData.dueDate;
        document.getElementById('taskStatus').value = taskData.status;
    } else {
        title.textContent = 'Add New Task';
        form.reset();
        document.getElementById('taskId').value = '';
        // Set default due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('taskDueDate').value = formatDate(tomorrow);
    }

    modal.classList.add('active');
}

function closeTaskModal() {
    taskModal.classList.remove('active');
}

function openEmployeeModal(employeeData = null) {
    const modal = document.getElementById('employeeModal');
    const title = document.getElementById('employeeModalTitle');
    const form = document.getElementById('employeeForm');

    if (employeeData) {
        title.textContent = 'Edit Employee';
        document.getElementById('employeeId').value = employeeData.id;
        document.getElementById('employeeName').value = employeeData.name;
        document.getElementById('employeeEmail').value = employeeData.email;
        document.getElementById('employeeDepartment').value = employeeData.department;
        document.getElementById('employeeRole').value = employeeData.role;
    } else {
        title.textContent = 'Add New Employee';
        form.reset();
        document.getElementById('employeeId').value = '';
    }

    modal.classList.add('active');
}

function closeEmployeeModal() {
    employeeModal.classList.remove('active');
}

function closeConfirmModal() {
    confirmModal.classList.remove('active');
}

// ===== Form Submissions =====
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const taskId = document.getElementById('taskId').value;
    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        employeeId: parseInt(document.getElementById('taskEmployee').value),
        priority: document.getElementById('taskPriority').value,
        dueDate: document.getElementById('taskDueDate').value,
        status: document.getElementById('taskStatus').value
    };

    if (taskId) {
        // Edit existing task
        const index = tasks.findIndex(t => t.id === parseInt(taskId));
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
            addActivity('pending', `Task "${taskData.title}" was updated`);
        }
    } else {
        // Add new task
        const newTask = {
            id: parseInt(generateId()),
            ...taskData,
            createdAt: formatDate(new Date())
        };
        tasks.push(newTask);
        const employee = employees.find(e => e.id === taskData.employeeId);
        addActivity('new', `New task "${taskData.title}" assigned to ${employee ? employee.name : 'Unknown'}`);
    }

    saveTasks();
    closeTaskModal();
    refreshCurrentView();
});

employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const employeeId = document.getElementById('employeeId').value;
    const employeeData = {
        name: document.getElementById('employeeName').value,
        email: document.getElementById('employeeEmail').value,
        department: document.getElementById('employeeDepartment').value,
        role: document.getElementById('employeeRole').value
    };

    if (employeeId) {
        // Edit existing employee
        const index = employees.findIndex(e => e.id === parseInt(employeeId));
        if (index !== -1) {
            employees[index] = { ...employees[index], ...employeeData };
        }
    } else {
        // Add new employee
        const newEmployee = {
            id: parseInt(generateId()),
            ...employeeData
        };
        employees.push(newEmployee);
        addActivity('new', `New employee "${employeeData.name}" added`);
    }

    saveEmployees();
    closeEmployeeModal();
    refreshCurrentView();
});

// ===== CRUD Operations =====
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) openTaskModal(task);
}

function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('confirmMessage').textContent = `Are you sure you want to delete the task "${task.title}"?`;
    confirmModal.classList.add('active');

    document.getElementById('confirmAction').onclick = () => {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        addActivity('pending', `Task "${task.title}" was deleted`);
        closeConfirmModal();
        refreshCurrentView();
    };
}

function markComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.status = 'completed';
    saveTasks();
    
    const employee = employees.find(e => e.id === task.employeeId);
    addActivity('completed', `${employee ? employee.name : 'Unknown'} completed "${task.title}"`);
    refreshCurrentView();
}

function editEmployee(id) {
    const employee = employees.find(e => e.id === id);
    if (employee) openEmployeeModal(employee);
}

function deleteEmployee(id) {
    const employee = employees.find(e => e.id === id);
    if (!employee) return;

    const employeeTasks = tasks.filter(t => t.employeeId === id);
    
    document.getElementById('confirmMessage').textContent = 
        `Are you sure you want to delete "${employee.name}"? ${employeeTasks.length > 0 ? `This will also remove ${employeeTasks.length} assigned task(s).` : ''}`;
    confirmModal.classList.add('active');

    document.getElementById('confirmAction').onclick = () => {
        employees = employees.filter(e => e.id !== id);
        tasks = tasks.filter(t => t.employeeId !== id);
        saveEmployees();
        saveTasks();
        addActivity('pending', `Employee "${employee.name}" was removed`);
        closeConfirmModal();
        refreshCurrentView();
    };
}

// ===== Search Functionality =====
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    
    if (query.length < 2) {
        refreshCurrentView();
        return;
    }

    // Search and highlight results
    const activeView = document.querySelector('.view.active').id;
    
    if (activeView === 'employeesView') {
        const filtered = employees.filter(e => 
            e.name.toLowerCase().includes(query) ||
            e.email.toLowerCase().includes(query) ||
            e.department.toLowerCase().includes(query)
        );
        // Re-render with filtered data
        renderFilteredEmployees(filtered);
    } else if (activeView === 'tasksView') {
        const filtered = tasks.filter(t => 
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
        );
        renderFilteredTasks(filtered);
    }
});

function renderFilteredEmployees(filteredEmployees) {
    const tbody = document.getElementById('employeesTableBody');
    
    if (filteredEmployees.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <div class="empty-state-icon">🔍</div>
                        <h3>No Results Found</h3>
                        <p>Try a different search term.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredEmployees.map(emp => {
        const empTasks = tasks.filter(t => t.employeeId === emp.id);
        const completed = empTasks.filter(t => t.status === 'completed').length;
        const pending = empTasks.filter(t => t.status !== 'completed').length;
        const total = empTasks.length || 1;
        const rate = Math.round(completed / total * 100);
        const rateClass = rate >= 70 ? 'high' : rate >= 40 ? 'medium' : 'low';

        return `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="avatar">${getInitials(emp.name)}</div>
                        <div>
                            <strong>${emp.name}</strong>
                            <br><small style="color: var(--text-secondary)">${emp.email}</small>
                        </div>
                    </div>
                </td>
                <td>${emp.department}</td>
                <td>${empTasks.length}</td>
                <td><span style="color: var(--success)">${completed}</span></td>
                <td><span style="color: var(--warning)">${pending}</span></td>
                <td>
                    <div class="completion-rate">
                        <div class="rate-bar">
                            <div class="rate-fill ${rateClass}" style="width: ${rate}%"></div>
                        </div>
                        <span>${rate}%</span>
                    </div>
                </td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn edit" onclick="editEmployee(${emp.id})">✏️</button>
                        <button class="action-btn delete" onclick="deleteEmployee(${emp.id})">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function renderFilteredTasks(filteredTasks) {
    const grid = document.getElementById('tasksGrid');

    if (filteredTasks.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <div class="empty-state-icon">🔍</div>
                <h3>No Results Found</h3>
                <p>Try a different search term.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredTasks.map(task => {
        const employee = employees.find(e => e.id === task.employeeId);
        const overdue = isOverdue(task.dueDate, task.status);
        const statusClass = overdue ? 'overdue' : task.status;

        return `
            <div class="task-card priority-${task.priority}">
                <div class="task-header">
                    <div>
                        <h3 class="task-title">${task.title}</h3>
                        <p class="task-description">${task.description}</p>
                    </div>
                </div>
                <div class="task-meta">
                    <span class="task-badge badge-status ${statusClass}">
                        ${overdue ? '⚠️ Overdue' : task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                    </span>
                    <span class="task-badge badge-priority ${task.priority}">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </span>
                </div>
                <div class="task-footer">
                    <div class="task-assignee">
                        <div class="avatar">${employee ? getInitials(employee.name) : '?'}</div>
                        <span>${employee ? employee.name : 'Unassigned'}</span>
                    </div>
                    <div class="task-actions">
                        ${task.status !== 'completed' ? 
                            `<button class="action-btn edit" onclick="markComplete(${task.id})" title="Mark Complete">✅</button>` : ''
                        }
                        <button class="action-btn edit" onclick="editTask(${task.id})" title="Edit">✏️</button>
                        <button class="action-btn delete" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="task-due ${overdue ? 'overdue' : ''}">
                    📅 Due: ${task.dueDate}
                </div>
            </div>
        `;
    }).join('');
}

// ===== Filter Event Listeners =====
document.getElementById('filterStatus').addEventListener('change', renderTasks);
document.getElementById('filterEmployee').addEventListener('change', renderTasks);
document.getElementById('filterPriority').addEventListener('change', renderTasks);

// ===== Utility =====
function refreshCurrentView() {
    const activeNav = document.querySelector('.nav-item.active');
    if (activeNav) {
        refreshView(activeNav.dataset.view);
    }
}

// ===== Initialize App =====
function init() {
    initializeSampleData();
    renderDashboard();
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === taskModal) closeTaskModal();
    if (e.target === employeeModal) closeEmployeeModal();
    if (e.target === confirmModal) closeConfirmModal();
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Initialize on load
init();
