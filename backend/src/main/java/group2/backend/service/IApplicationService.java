package group2.backend.service;

import group2.backend.model.Application;

import java.util.List;

public interface IApplicationService {
    List<Application> getApplications();
    Application getApplication(long id);
    Application addApplication(Application application);
    Application updateApplication(long id, Application application);
    void deleteApplication(long id);
}
