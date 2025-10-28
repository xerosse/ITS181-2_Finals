package group2.backend.service;

import group2.backend.model.Application;
import group2.backend.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService implements IApplicationService{
    @Autowired
    private ApplicationRepository repository;

    public List<Application> getApplications() {
        return (List<Application>) repository.findAll();
    }

    public Application getApplication(long id) {
        Optional<Application> optional=repository.findById(id);
        if (optional.isEmpty()) {
            return null;
        }
        else {
            return (Application) optional.get();
        }
    }

    public Application addApplication(Application application) {
        return repository.save(application);
    }

    public Application updateApplication(long id, Application application) {
        Optional<Application> current_data = repository.findById(id);

        if (current_data.isPresent()) {
            Application current_application = current_data.get();

            // overwrite data except id
            current_application.setDog(application.getDog());
            current_application.setUser(application.getUser());
            current_application.setStatus(application.getStatus());
            current_application.setApplication_date(application.getApplication_date());

            return repository.save(current_application);
        }
        else {
            return null;
        }
    }

    public void deleteApplication(long id) {
        Optional<Application> application = repository.findById(id);
        if (application.isPresent()) {
            repository.delete(application.get());
        }

    }


}
