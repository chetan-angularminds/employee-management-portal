// organisation.constants.js
const JOB_TITLES = {
    SOFTWARE_ENGINEER: "Software Engineer",
    PRODUCT_MANAGER: "Product Manager",
    HR_MANAGER: "HR Manager",
    DEVOPS_ENGINEER: "DevOps Engineer",
    SALES_EXECUTIVE: "Sales Executive",
    MARKETING_SPECIALIST: "Marketing Specialist",
    FINANCE_ANALYST: "Finance Analyst",
    OPERATIONS_COORDINATOR: "Operations Coordinator",
};

// Enum for policy types
const POLICY_TYPES = {
    PROBATION: "probation",
    LEAVE: "leave",
    ATTENDANCE: "attendance",
    PERFORMANCE: "performance",
    REMOTE_WORK: "remote_work",
};

const DEPARTMENTS = {
    HR: "Human Resources",
    IT: "Information Technology",
    FINANCE: "Finance",
    MARKETING: "Marketing",
    SALES: "Sales",
    OPERATIONS: "Operations",
    ADMIN: "Administration",
    ENGINEERING: "Engineering",
    PRODUCTION: "Production",
    QUALITY: "Quality",
    SUPPLY_CHAIN: "Supply Chain",
    CUSTOMER_SERVICE: "Customer Service",
    RESEARCH: "Research",
    DEVELOPMENT: "Development",
    LEGAL: "Legal",
    SECURITY: "Security",
    FACILITIES: "Facilities",
    PROCUREMENT: "Procurement",
    LOGISTICS: "Logistics",
    TRANSPORT: "Transport",
    WAREHOUSE: "Warehouse",
    DISTRIBUTION: "Distribution",
};

const POSITIONS = {
    MANAGER: "Manager",
    ENGINEER: "Engineer",
    ANALYST: "Analyst",
    SPECIALIST: "Specialist",
    ASSISTANT: "Assistant",
    DIRECTOR: "Director",
    EXECUTIVE: "Executive",
    COORDINATOR: "Coordinator",
    CONSULTANT: "Consultant",
    INTERN: "Intern",
    SUPERVISOR: "Supervisor",
    OFFICER: "Officer",
};

const WORKER_TYPES = {
    PERMANENT: "Permanent",
    CONTRACT: "Contract",
    TEMPORARY: "Temporary",
    INTERN: "Intern",
    APPRENTICE: "Apprentice",
    VOLUNTEER: "Volunteer",
    FREELANCE: "Freelance",
};

const WORK_TIME_TYPES = {
    FULL_TIME: "Full-Time",
    PART_TIME: "Part-Time",
};

const CONTRACT_STATUSES = {
    PERMANENT: "Permanent",
    TEMPORARY: "Temporary",
    PROBATION: "Probation",
    FIXED_TERM: "Fixed-Term",
};

const PAY_BANDS = {
    BAND_A: "Band A",
    BAND_B: "Band B",
    BAND_C: "Band C",
    BAND_D: "Band D",
};

const PAY_GRADES = {
    GRADE_1: "Grade 1",
    GRADE_2: "Grade 2",
    GRADE_3: "Grade 3",
    GRADE_4: "Grade 4",
    GRADE_5: "Grade 5",
};

const PROBATION = {
    MAX_PROBATION_PERIOD: 90, // Default max probation period in days
    ALLOWED_POLICIES: [], // Placeholder for probation policy ObjectIds
};

const OrganisationConstants = {
    JOB_TITLES,
    DEPARTMENTS,
    POSITIONS,
    WORKER_TYPES,
    WORK_TIME_TYPES,
    CONTRACT_STATUSES,
    PAY_BANDS,
    PAY_GRADES,
    PROBATION,
    POLICY_TYPES,
};

export default OrganisationConstants;
