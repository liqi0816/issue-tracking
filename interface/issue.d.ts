interface Issue {
    issue_id: number,
    project_id: number,
    reporter_id: number,
    current_status_id: number,
    issue_title: string,
    issue_description: string,
    create_date: number,
}

interface IssueStatusHistory {
    issue_id: number,
    assignee_id: number,
    start_status_id: number,
    end_status_id: number,
    done_date: number,
}
