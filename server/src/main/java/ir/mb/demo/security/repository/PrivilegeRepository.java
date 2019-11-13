package ir.mb.demo.security.repository;

import ir.mb.demo.security.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long>, JpaSpecificationExecutor<Privilege> {
    Privilege findByName(String name);
}
