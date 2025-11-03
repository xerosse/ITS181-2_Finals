package group2.backend.controller;

import group2.backend.model.Dog;
import group2.backend.model.Account;
import group2.backend.model.Application;
import group2.backend.service.IDogService;
import group2.backend.service.IAccountService;
import group2.backend.service.IApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MyController {
    @Autowired
    private IDogService dogService;
    
    @Autowired
    private IAccountService accountService;
    
    @Autowired
    private IApplicationService applicationService;

    // Dog CRUD requests
    @RequestMapping("/api/dogs")
    public List<Dog> findDogs() {
        return dogService.getDogs();
    }

    @RequestMapping(value = "/api/show-dog/{id}")
    public Dog showDog(@PathVariable long id) {
        return dogService.getDog(id);
    }

    @RequestMapping(value="/api/add-dog", method= RequestMethod.POST)
    public Dog addDogSubmit(@RequestBody Dog dog) {
        return dogService.addDog(dog);
    }

    @RequestMapping(value="/api/update-dog/{id}", method=RequestMethod.PUT)
    public Dog updateDog(@PathVariable int id, @RequestBody Dog dog)
    {
        return dogService.updateDog(id, dog);
    }

    @RequestMapping(value="/api/delete-dog/{id}", method=RequestMethod.DELETE)
    public void deleteDog(@PathVariable long id) { dogService.deleteDog(id); }

    // Account CRUD requests
    @RequestMapping("/api/accounts")
    public List<Account> findAccounts() {
        return accountService.getAccounts();
    }

    @RequestMapping(value = "/api/show-account/{id}")
    public Account showAccount(@PathVariable long id) {
        return accountService.getAccount(id);
    }

    @RequestMapping(value="/api/add-account", method= RequestMethod.POST)
    public Account addAccountSubmit(@RequestBody Account account) {
        return accountService.addAccount(account);
    }

    @RequestMapping(value="/api/update-account/{id}", method=RequestMethod.PUT)
    public Account updateAccount(@PathVariable int id, @RequestBody Account account)
    {
        return accountService.updateAccount(id, account);
    }

    @RequestMapping(value="/api/delete-account/{id}", method=RequestMethod.DELETE)
    public void deleteAccount(@PathVariable long id) { 
        accountService.deleteAccount(id); 
    }

    // Application CRUD requests
    @RequestMapping("/api/applications")
    public List<Application> findApplications() {
        return applicationService.getApplications();
    }

    @RequestMapping(value = "/api/show-application/{id}")
    public Application showApplication(@PathVariable long id) {
        return applicationService.getApplication(id);
    }

    @RequestMapping(value="/api/add-application", method= RequestMethod.POST)
    public Application addApplicationSubmit(@RequestBody Application application) {
        return applicationService.addApplication(application);
    }

    @RequestMapping(value="/api/update-application/{id}", method=RequestMethod.PUT)
    public Application updateApplication(@PathVariable int id, @RequestBody Application application)
    {
        return applicationService.updateApplication(id, application);
    }

    @RequestMapping(value="/api/delete-application/{id}", method=RequestMethod.DELETE)
    public void deleteApplication(@PathVariable long id) { applicationService.deleteApplication(id); }
}
