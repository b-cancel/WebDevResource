<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit57592abb2b5a8c21f6db94b97abae3e8
{
    public static $files = array (
        '320cde22f66dd4f5d3fd621d3e88b98f' => __DIR__ . '/..' . '/symfony/polyfill-ctype/bootstrap.php',
        '0e6d7bf4a5811bfa5cf40c5ccd6fae6a' => __DIR__ . '/..' . '/symfony/polyfill-mbstring/bootstrap.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Symfony\\Polyfill\\Mbstring\\' => 26,
            'Symfony\\Polyfill\\Ctype\\' => 23,
            'Symfony\\Component\\Yaml\\' => 23,
            'Symfony\\Component\\Validator\\' => 28,
            'Symfony\\Component\\Translation\\' => 30,
            'Symfony\\Component\\Finder\\' => 25,
            'Symfony\\Component\\Filesystem\\' => 29,
            'Symfony\\Component\\Console\\' => 26,
            'Symfony\\Component\\Config\\' => 25,
        ),
        'P' => 
        array (
            'Psr\\Log\\' => 8,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Symfony\\Polyfill\\Mbstring\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-mbstring',
        ),
        'Symfony\\Polyfill\\Ctype\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/polyfill-ctype',
        ),
        'Symfony\\Component\\Yaml\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/yaml',
        ),
        'Symfony\\Component\\Validator\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/validator',
        ),
        'Symfony\\Component\\Translation\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/translation',
        ),
        'Symfony\\Component\\Finder\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/finder',
        ),
        'Symfony\\Component\\Filesystem\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/filesystem',
        ),
        'Symfony\\Component\\Console\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/console',
        ),
        'Symfony\\Component\\Config\\' => 
        array (
            0 => __DIR__ . '/..' . '/symfony/config',
        ),
        'Psr\\Log\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/log/Psr/Log',
        ),
    );

    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'Propel' => 
            array (
                0 => __DIR__ . '/..' . '/propel/propel/src',
            ),
        ),
    );

    public static $classMap = array (
        'Base\\Recipe' => __DIR__ . '/../..' . '/models/Base/Recipe.php',
        'Base\\RecipeQuery' => __DIR__ . '/../..' . '/models/Base/RecipeQuery.php',
        'Base\\Steps' => __DIR__ . '/../..' . '/models/Base/Steps.php',
        'Base\\StepsQuery' => __DIR__ . '/../..' . '/models/Base/StepsQuery.php',
        'Map\\RecipeTableMap' => __DIR__ . '/../..' . '/models/Map/RecipeTableMap.php',
        'Map\\StepsTableMap' => __DIR__ . '/../..' . '/models/Map/StepsTableMap.php',
        'Recipe' => __DIR__ . '/../..' . '/models/Recipe.php',
        'RecipeQuery' => __DIR__ . '/../..' . '/models/RecipeQuery.php',
        'Steps' => __DIR__ . '/../..' . '/models/Steps.php',
        'StepsQuery' => __DIR__ . '/../..' . '/models/StepsQuery.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit57592abb2b5a8c21f6db94b97abae3e8::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit57592abb2b5a8c21f6db94b97abae3e8::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit57592abb2b5a8c21f6db94b97abae3e8::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit57592abb2b5a8c21f6db94b97abae3e8::$classMap;

        }, null, ClassLoader::class);
    }
}
