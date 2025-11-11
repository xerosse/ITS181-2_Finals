package group2.backend.controller;

import group2.backend.model.Dog;
import group2.backend.model.Account;
import group2.backend.model.Application;
import group2.backend.service.IDogService;
import group2.backend.service.IAccountService;
import group2.backend.service.IApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
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
    public ResponseEntity<?> addDogSubmit(@RequestBody Dog dog) {
        try {
            System.out.println("Received dog: " + dog);
            
            // Validate input
            if (dog.getName() == null || dog.getName().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Dog name is required"));
            }
            if (dog.getBreed() == null || dog.getBreed().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Breed is required"));
            }
            
            Dog saved = dogService.addDog(dog);
            System.out.println("Dog saved successfully: " + saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Failed to add dog: " + e.getMessage()));
        }
    }

    @RequestMapping(value="/api/update-dog/{id}", method=RequestMethod.PUT)
    public ResponseEntity<?> updateDog(@PathVariable int id, @RequestBody Dog dog) {
        try {
            Dog updated = dogService.updateDog(id, dog);
            if (updated == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Dog not found"));
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Failed to update dog: " + e.getMessage()));
        }
    }

    @RequestMapping(value="/api/delete-dog/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<?> deleteDog(@PathVariable long id) {
        try {
            Dog dog = dogService.getDog(id);
            if (dog == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Dog not found: " + id));
            }
            dogService.deleteDog(id);
            return ResponseEntity.noContent().build();
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("Cannot delete dog, it has an ongoing application"));
        } catch (EmptyResultDataAccessException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("Dog not found: " + id));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server error while deleting dog"));
        }
    }

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
    public ResponseEntity<?> addAccountSubmit(@RequestBody Account account) {
        try {
            // Validate input
            if (account.getName() == null || account.getName().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Name is required"));
            }
            if (account.getEmail() == null || account.getEmail().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Email is required"));
            }
            if (account.getPassword() == null || account.getPassword().length() < 6) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Password must be at least 6 characters"));
            }
            
            Account saved = accountService.addAccount(account);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Email already in use")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("Email already exists"));
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("Failed to create account: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Server error: " + e.getMessage()));
        }
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
    public void deleteApplication(@PathVariable long id) { 
        applicationService.deleteApplication(id); 
    }

    // Error response class
    static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
