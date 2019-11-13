package ir.mb.demo.base;

import org.springframework.data.jpa.domain.Specification;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class BaseRest<E> {

    protected Specification getSpecification(String search) {
        MbSpecificationsBuilder builder = new MbSpecificationsBuilder();
        Pattern pattern = Pattern.compile("(\\w+?)([:<>~*])(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1),matcher.group(2), matcher.group(3));
        }
        return builder.build();
    }

}
