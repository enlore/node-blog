# Lemme Hold One Fifty
## Imma be honest brotha Imma buy me a bottle uh wine

Vagrant! Let's use it for a dev environment to develope our projects.

### Set up a box
Install the package appropriate for your system and likewise install
VirtualBox.

Create a project directory:

    $ mkdir dolla_fity
    $ cd dolla_fity

Set vagrant up with a config file, written to disk as `Vagrantfile`.

    $ vagrant init http://files.vagrantup.com/precise32.box

Here we've passed a url to vagrant's init command specifying the location
of a VirtualBox compatible VM for vagrant to use as the foundation of our
dev box.

    $ vagrant up

Now Vagrant is going to download the vm, config it, and fire it up. Also note
that the precise32 vm will now be available for use in the future for further
Vagrant vm's.

SSH into the newly created Vagrant box with:

    $ vagrant ssh

Take a look around and you'll notice that Vagrant defaults to sharing the
contents of the host directory on the guest VM in the `/vagrant` dir.

If you so desire, you can delete a Vagrant vm by invoking `vagrant destroy`.

### On boxes

Vagrant keeps track of a collection of base vm's for reuse project to project.

In Ubuntu, installing Vagrant created `~/.vagrant.d`, under which Vagrant
keeps all kinds of interesting things. Not least of which is a dir, `boxes`,
in which is keeps the images it uses for cloning new Vagrant boxes.

Feeding a uri to `vagrant init` instructs Vagrant to fetch down that box and
save it with the name of the fetched box file.  You can also manage base boxes
by:

    $ vagrant box add <box_name> <box_uri>

It'll fetch a box from the network or from the disk.

### Provisioning
#### Or, How You Should Be Using Vagrant

Vagrant is configurable such that you can make use of any number of different
provisioning systems to make creating and reusing consistent box setups 
really easy.  Like, really.

    config.vm.provision "identifier", key: "vals for this prov ident", ...
    # or
    config.vm.provision "ident" do |s|
        s.key = "val"
    end

Multiple  provisioners can be used and will be run in the sequence defined.
Certain provisioners make additional configy method calls available in the
context of a ruby block.

The configured provisioners for a box are run in three circuimstances:

1. on `vagrant up`, the box is imported, config'd, booted, and the p's are run
2. on `vagrant reload --provision` the box is rebooted and the p's are forced to run
3. on `vagrant provision` runs provisioners config'd on a box

`--no-provision` can be passed to `up` and `reload`.
`--provision-with identifier` can be passed to just run a given provisioner.

Now, on to the provisioners I'll be using.

#### Puppet

    config.vm.provision "puppet" do |puppet|
        puppet.manifests_path   = "manifests" || ["vm", "/path/to/manifests"]
        puppet.manifest_file    = "default.pp"
        puppet.module_path      = "modules"
        puppet.options          = ""
        puppet.hiera_config_path = "hiera.yaml"
        puppet.working_directory = "/tmp/vagrant-puppet"
        puppet.facter = {
            "vagrant" => "1"
        }
    end
### Command Line Commands

`vagrant init` creates a new Vagrantfile in the cwd.


`vagrant up` bootstraps a vagrant box, importing the base image, configured
guest and host stuff, and booting the machine.


`vagrant reload` imports, configs, and provisions a box all over again.
Passing the `--provision` flag skips the import and config steps and
just runs the provisioner set up in the Vagrantfile.


`vagrant ssh` drops you into an ssh session to the guest box.


`vagrant ssh-config` prints the ssh config Vagrant uses to ssh into the box.


`vagrant suspend` suspends the box, state intact. Takes up quite
a bit of space, though. `vagrant up` to fire it back up.


`vagrant halt` shuts the machine down (gracefully), maintaining disk state.
`vagrant up` to start the box up again.


`vagrant destroy` destroys all traces of a Vagrant box. Biggest host memory
and disk savings, takes the longest.

### Config is King

What all can we do with our Vagrantfile, anyway?

Well, I can tell you what you _should_ do.  You should definitely check
Vagrantfiles into source control. Make sure the Vagrantfile for a project
gets distributed to new developers so that they can get up and running
quickly.

Now, as far as what you can do, you can:

 * Define the base VM that Vagrant will clone as the basis for this box
 * Set up shared directories
 * Set up ports to forward connections into the box
 * Define a method for provisioning your box, be it via shell script or a 
tool like Puppet.


<pre>
    # define a box name, assuming you already have this box downloaded
    config.vm.box = 'precise32'
    
    # define a synced folder
    # host, guest
    # host path can be relative
    # guest path must be absolute
    config.vm.synced_folder "host_src/", "/var/guest/www", disalbed: false,\
         create: true, group: "group", mount_options: [], owner: "", type: ""
    
    # config port forwarding
    # reload or up for changes to take effect
    config.vm.network :forwarded_port, host: 4567, guest: 80
    
    # tells vagrant what provisioning method to use, in this case by executing
    # a shell script found on the box at the specified path
    config.vm.provision :shell, :path => "bootstrapping_script.sh"
</pre>

---------
