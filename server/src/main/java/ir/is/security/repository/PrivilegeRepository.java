package ir.is.security.repository;

import ir.is.security.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long>, JpaSpecificationExecutor<Privilege> {
    Privilege findByName(String name);
}
