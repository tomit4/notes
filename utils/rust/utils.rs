pub fn print_type_of<T>(v: &str, _: &T) {
    println!("type of {} :=> {}", v, std::any::type_name::<T>())
}
// example usage:
// print_type_of("title", &title);
