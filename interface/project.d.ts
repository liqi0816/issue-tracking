interface Project {
    project_id: number,
    creator_id: number,
    project_name: string,
    project_description: string,
    create_date: number,
}

interface ProjectLead {
    grantor_id: number,
    grantee_id: number,
    project_id: number,
    grant_date: number,
}

interface ProjectIssuetStatus {
    status_id: number,
    project_id: number,
    status_name: string,
    status_type?: 'OPEN' | 'CLOSED',
}

interface ProjectIssueStatusTransition {
    status_id: number,
    project_id: number,
    next_status: number[],
}
