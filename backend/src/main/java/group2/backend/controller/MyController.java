package group2.backend.controller;

import group2.backend.model.Dog;
import group2.backend.service.IDogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class MyController {
    @Autowired
    private IDogService dogService;

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

    @RequestMapping(value="/api/delete-dog/{id}", method=RequestMethod.GET)
    public void deleteDog(@PathVariable long id) { dogService.deleteDog(id); }

    // Login validation
    // NOTE: No Account entity yet, will revise later
//    @RequestMapping(value="/api/login", method= RequestMethod.POST)
//    public boolean validateLogin(@RequestBody String login_request) {
        // find username on database
        // compare password from database and json request

        // return the Account entity if valid, else error
//    }

}
